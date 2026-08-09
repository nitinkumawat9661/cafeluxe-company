"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandStateScreen } from "./BrandStateScreen";

function notifyServiceWorker(offline: boolean) {
  navigator.serviceWorker?.controller?.postMessage({
    type: "TRUSTFIRST_NETWORK_STATE",
    offline,
  });
}

export function OfflineMonitor() {
  const pathname = usePathname();
  const excludedRoute = pathname.startsWith("/studio");
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (excludedRoute) return;

    const sync = () => {
      const isOffline = !navigator.onLine;
      setOffline(isOffline);
      notifyServiceWorker(isOffline);
    };

    const initialSync = window.setTimeout(sync, 0);

    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);

    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, [excludedRoute]);

  if (excludedRoute || !offline) return null;

  return (
    <BrandStateScreen
      state="offline"
      overlay
      animationMode="video"
      primaryAction={{
        label: "Retry",
        onClick: () => {
          if (navigator.onLine) {
            notifyServiceWorker(false);
            window.location.reload();
          }
        },
      }}
      secondaryAction={null}
    />
  );
}
