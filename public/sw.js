/* TrustFirst branded offline service worker */

const VERSION = "v1";
const PRECACHE = `trustfirst-precache-${VERSION}`;
const STATIC_CACHE = `trustfirst-static-${VERSION}`;
const CACHE_PREFIX = "trustfirst-";

const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/trustfirst-logo-original.png",
  "/brand/trustfirst-brand-intro-v1.webm",
  "/brand/trustfirst-brand-poster-v1.webp",
];

const INLINE_OFFLINE_FALLBACK = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080706"><title>You're offline | TrustFirst Solutions</title></head><body style="margin:0;min-height:100svh;display:grid;place-items:center;padding:24px;background:#030302;color:#fff7e8;font-family:system-ui,sans-serif;text-align:center"><main><img src="/trustfirst-logo-original.png" alt="TrustFirst Solutions" width="112" height="112" style="border-radius:20px;max-width:30vw;height:auto"><p style="margin:18px 0 0;color:#c89b45;font-size:12px;font-weight:800;letter-spacing:.22em">OFFLINE</p><h1 style="margin:12px 0 0;font-family:Georgia,serif;font-size:clamp(2.2rem,10vw,4rem);font-weight:600">You're offline</h1><p style="max-width:32rem;margin:14px auto 0;color:#d6c8ae;line-height:1.7">Check your internet connection and retry when you're back online.</p><button onclick="location.reload()" style="margin-top:22px;min-height:48px;padding:12px 24px;border:0;border-radius:999px;background:#c89b45;color:#080604;font-weight:800">Retry</button></main></body></html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);

      await Promise.allSettled(
        PRECACHE_URLS.map(async (url) => {
          const request = new Request(url, { cache: "reload" });
          const response = await fetch(request);
          if (response.ok) {
            await cache.put(request, response);
          }
        }),
      );

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== PRECACHE && key !== STATIC_CACHE)
          .map((key) => caches.delete(key)),
      );

      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, response.clone());
  }

  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => undefined);

  if (cached) {
    void networkPromise;
    return cached;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;

  throw new Error("Static asset unavailable");
}

async function offlineFallback() {
  const cache = await caches.open(PRECACHE);
  const cached = await cache.match(OFFLINE_URL);

  if (cached) return cached;

  return new Response(INLINE_OFFLINE_FALLBACK, {
    status: 503,
    statusText: "Offline",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache or synthesize API responses; real API failures must remain observable.
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => offlineFallback()),
    );
    return;
  }

  if (
    url.pathname === "/trustfirst-logo-original.png" ||
    url.pathname.startsWith("/brand/") ||
    url.pathname === OFFLINE_URL
  ) {
    event.respondWith(cacheFirst(request).catch(() => caches.match(request)));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js")
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});
