"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandStateScreen } from "./BrandStateScreen";

export function OfflineMonitor() {
  const pathname = usePathname();
  const excludedRoute = pathname.startsWith("/studio");
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (excludedRoute) {
      setOffline(false);
      return;
    }

    const sync = () => setOffline(!navigator.onLine);

    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);

    return () => {
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
            window.location.reload();
            return;
          }

          setOffline(true);
        },
      }}
      secondaryAction={null}
    />
  );
}
