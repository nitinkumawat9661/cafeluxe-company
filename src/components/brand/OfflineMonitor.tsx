"use client";

import { useEffect, useState } from "react";
import { BrandStateScreen } from "./BrandStateScreen";

export function OfflineMonitor() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);

    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);

    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;

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
