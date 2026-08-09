"use client";

import { useEffect } from "react";
import { BrandStateScreen } from "@/components/brand/BrandStateScreen";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[TrustFirst] Global application error", error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body style={{ margin: 0, background: "#030302" }}>
        <BrandStateScreen
          state="server-error"
          statusCode={error.digest ? `500 · ${error.digest}` : 500}
          animationMode="video"
          primaryAction={{ label: "Try again", onClick: reset }}
          secondaryAction={{ label: "Go to home", href: "/" }}
        />
      </body>
    </html>
  );
}
