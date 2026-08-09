"use client";

import { useEffect } from "react";
import { BrandStateScreen } from "@/components/brand/BrandStateScreen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[TrustFirst] App Router runtime error", error);
  }, [error]);

  return (
    <BrandStateScreen
      state="runtime-error"
      statusCode={error.digest ? `ERROR ${error.digest}` : undefined}
      animationMode="video"
      primaryAction={{ label: "Try again", onClick: reset }}
      secondaryAction={{ label: "Go to home", href: "/" }}
    />
  );
}
