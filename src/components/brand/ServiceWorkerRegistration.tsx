"use client";

import { useEffect } from "react";

type IdleCapableWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
};

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const shouldRegister = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER === "1";
    if (!shouldRegister) return;

    let cancelled = false;

    const register = async () => {
      if (cancelled) return;

      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
      } catch (error) {
        // Keep service-worker failures observable without blocking the website.
        console.error("[TrustFirst] Service worker registration failed", error);
      }
    };

    const scheduleRegistration = () => {
      const idleWindow = window as IdleCapableWindow;
      const requestIdle = idleWindow.requestIdleCallback;

      if (typeof requestIdle === "function") {
        requestIdle.call(window, () => void register(), { timeout: 2500 });
        return;
      }

      globalThis.setTimeout(() => void register(), 400);
    };

    if (document.readyState === "complete") {
      scheduleRegistration();
    } else {
      window.addEventListener("load", scheduleRegistration, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleRegistration);
    };
  }, []);

  return null;
}
