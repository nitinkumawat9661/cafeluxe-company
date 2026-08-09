const BASE_URL = process.env.BRAND_TEST_BASE_URL ?? "http://127.0.0.1:3100";
const CDP_URL = process.env.BRAND_TEST_CDP_URL ?? "http://127.0.0.1:9222";

function fail(message) {
  throw new Error(`[brand-browser-smoke] ${message}`);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJsonWithRetry(url, options = {}, attempts = 40) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return await response.json();
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }

    await delay(150);
  }

  throw lastError ?? new Error(`Unable to fetch ${url}`);
}

class CdpClient {
  constructor(socketUrl) {
    this.socket = new WebSocket(socketUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();
  }

  async open() {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("CDP websocket open timed out")), 5000);
      this.socket.addEventListener(
        "open",
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true },
      );
      this.socket.addEventListener(
        "error",
        () => {
          clearTimeout(timeout);
          reject(new Error("CDP websocket failed to open"));
        },
        { once: true },
      );
    });

    this.socket.addEventListener("message", (event) => {
      const payload = JSON.parse(String(event.data));

      if (payload.id) {
        const pending = this.pending.get(payload.id);
        if (!pending) return;
        this.pending.delete(payload.id);

        if (payload.error) {
          pending.reject(new Error(`${pending.method}: ${payload.error.message}`));
        } else {
          pending.resolve(payload.result ?? {});
        }
        return;
      }

      if (payload.method) {
        const listeners = this.waiters.get(payload.method) ?? [];
        this.waiters.delete(payload.method);
        listeners.forEach((listener) => listener.resolve(payload.params ?? {}));
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;

    const promise = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
    });

    this.socket.send(JSON.stringify({ id, method, params }));
    return promise;
  }

  once(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const listener = { resolve, reject };
      const listeners = this.waiters.get(method) ?? [];
      listeners.push(listener);
      this.waiters.set(method, listeners);

      const timeout = setTimeout(() => {
        const active = this.waiters.get(method) ?? [];
        this.waiters.set(
          method,
          active.filter((entry) => entry !== listener),
        );
        reject(new Error(`${method} timed out`));
      }, timeoutMs);

      listener.resolve = (params) => {
        clearTimeout(timeout);
        resolve(params);
      };
    });
  }

  async navigate(url, timeoutMs = 12000) {
    const loaded = this.once("Page.loadEventFired", timeoutMs);
    const result = await this.send("Page.navigate", { url });

    if (result.errorText) {
      throw new Error(`Navigation failed: ${result.errorText}`);
    }

    await loaded;
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
      userGesture: true,
    });

    if (result.exceptionDetails) {
      throw new Error(`Runtime evaluation failed: ${result.exceptionDetails.text ?? "unknown error"}`);
    }

    return result.result?.value;
  }

  close() {
    this.socket.close();
  }
}

const target = await fetchJsonWithRetry(
  `${CDP_URL}/json/new?${encodeURIComponent("about:blank")}`,
  { method: "PUT" },
);

const client = new CdpClient(target.webSocketDebuggerUrl);
await client.open();

try {
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable");

  console.log("[brand-browser-smoke] first-session intro");
  await client.navigate(`${BASE_URL}/`);
  await delay(180);

  assert(
    await client.evaluate("Boolean(document.querySelector('[data-testid=\"brand-intro\"]'))"),
    "brand intro did not appear on first session visit",
  );

  await delay(420);
  const playback = await client.evaluate(`
    (() => {
      const video = document.querySelector('[data-testid="brand-animation-video"]');
      if (!video) return { present: false, readyState: 0, currentTime: 0, error: -1 };
      return {
        present: true,
        readyState: video.readyState,
        currentTime: video.currentTime,
        error: video.error?.code ?? 0
      };
    })()
  `);
  assert(playback.present, "optimized brand video was not rendered during the intro");
  assert(playback.error === 0, `optimized brand video reported media error ${playback.error}`);
  assert(playback.readyState >= 2, `optimized brand video did not decode enough data (readyState=${playback.readyState})`);
  assert(playback.currentTime > 0, "optimized brand video did not begin playback");

  await delay(2350);
  assert(
    !(await client.evaluate("Boolean(document.querySelector('[data-testid=\"brand-intro\"]'))")),
    "brand intro remained visible beyond the maximum duration",
  );

  console.log("[brand-browser-smoke] navigation does not replay intro");
  await client.navigate(`${BASE_URL}/contact`);
  await delay(220);
  assert(
    !(await client.evaluate("Boolean(document.querySelector('[data-testid=\"brand-intro\"]'))")),
    "brand intro replayed during the same browser session",
  );

  console.log("[brand-browser-smoke] service worker activation");
  const serviceWorkerReady = await client.evaluate(`
    Promise.race([
      navigator.serviceWorker?.ready.then(() => true) ?? Promise.resolve(false),
      new Promise((resolve) => setTimeout(() => resolve(false), 7000))
    ])
  `);
  assert(serviceWorkerReady, "service worker did not become ready");

  const controlled = await client.evaluate(`
    new Promise((resolve) => {
      if (navigator.serviceWorker?.controller) {
        resolve(true);
        return;
      }
      const timer = setTimeout(() => resolve(Boolean(navigator.serviceWorker?.controller)), 5000);
      navigator.serviceWorker?.addEventListener("controllerchange", () => {
        clearTimeout(timer);
        resolve(true);
      }, { once: true });
    })
  `);
  assert(controlled, "page was not controlled by the service worker");

  console.log("[brand-browser-smoke] 404 state");
  await client.navigate(`${BASE_URL}/brand-ci-missing-${Date.now()}`);
  await delay(150);
  const notFoundText = await client.evaluate("document.body.innerText");
  assert(notFoundText.includes("Page not found"), "branded 404 text was not rendered");
  assert(notFoundText.includes("404"), "404 status label was not rendered");

  console.log("[brand-browser-smoke] animation failure fallback");
  const fallbackBefore = await client.evaluate(
    "Boolean(document.querySelector('[data-testid=\"brand-animation-fallback\"]'))",
  );
  assert(fallbackBefore, "static brand fallback image is missing");

  await client.evaluate(`
    (() => {
      const video = document.querySelector('[data-testid="brand-animation-video"]');
      if (!video) return false;
      video.src = '/brand/intentionally-missing-ci-test.webm';
      video.load();
      return true;
    })()
  `);
  await delay(450);

  assert(
    !(await client.evaluate("Boolean(document.querySelector('[data-testid=\"brand-animation-video\"]'))")),
    "failed animation did not fall back to the static logo",
  );
  assert(
    await client.evaluate("Boolean(document.querySelector('[data-testid=\"brand-animation-fallback\"]'))"),
    "static fallback disappeared after animation failure",
  );

  console.log("[brand-browser-smoke] runtime error boundary");
  await client.navigate(`${BASE_URL}/brand-ci-runtime-error`);
  await delay(300);
  const runtimeText = await client.evaluate("document.body.innerText");
  assert(
    runtimeText.includes("Something went wrong") || runtimeText.includes("Server error"),
    "runtime/server error did not render a branded error boundary",
  );

  console.log("[brand-browser-smoke] mobile responsiveness 390x844");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await client.navigate(`${BASE_URL}/brand-ci-mobile-missing-${Date.now()}`);
  await delay(150);

  const mobile = await client.evaluate(`
    ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      titleWidth: document.querySelector('h1')?.getBoundingClientRect().width ?? 0,
      screenWidth: document.querySelector('[data-testid="brand-state-screen"]')?.getBoundingClientRect().width ?? 0
    })
  `);
  assert(mobile.viewport === 390, `unexpected mobile viewport: ${mobile.viewport}`);
  assert(mobile.scrollWidth <= mobile.viewport + 1, `horizontal overflow detected: ${mobile.scrollWidth}px`);
  assert(mobile.titleWidth <= mobile.viewport, "state title overflows the mobile viewport");
  assert(mobile.screenWidth <= mobile.viewport + 1, "state screen overflows the mobile viewport");

  console.log("[brand-browser-smoke] zero-network offline fallback");
  await client.send("Emulation.clearDeviceMetricsOverride");
  await client.send("Network.emulateNetworkConditions", {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
  });

  let offlineNavigationError = null;
  try {
    await client.navigate(`${BASE_URL}/brand-ci-offline-${Date.now()}`, 8000);
  } catch (error) {
    offlineNavigationError = error;
    await delay(900);
  }

  const offlineText = await client.evaluate("document.body.innerText").catch(() => "");

  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });

  assert(
    offlineText.includes("You're offline"),
    `offline fallback was not rendered${offlineNavigationError ? ` (${offlineNavigationError.message})` : ""}`,
  );
  assert(offlineText.includes("Retry"), "offline Retry action was not rendered");

  console.log("[brand-browser-smoke] PASS");
} finally {
  try {
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  } catch {
    // Best-effort cleanup.
  }
  client.close();
}
