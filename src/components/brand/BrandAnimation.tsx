"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import styles from "./brand-state.module.css";

export type BrandAnimationMode = "video" | "pulse" | "static";

type BrandAnimationProps = {
  mode?: BrandAnimationMode;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  loop?: boolean;
  decorative?: boolean;
};

const VIDEO_SRC = "/brand/trustfirst-brand-intro-v1.webm";
const POSTER_SRC = "/brand/trustfirst-brand-poster-v1.webp";
const FALLBACK_SRC = "/trustfirst-logo-original.png";

export function BrandAnimation({
  mode = "video",
  className = "",
  preload = "metadata",
  loop = true,
  decorative = true,
}: BrandAnimationProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const useVideo = mode === "video" && !videoFailed;

  return (
    <div
      className={[styles.animationFrame, styles[`animation_${mode}`], className].filter(Boolean).join(" ")}
      aria-hidden={decorative || undefined}
      data-testid="brand-animation"
    >
      <div className={styles.animationGlow} aria-hidden="true" />

      <img
        src={FALLBACK_SRC}
        alt={decorative ? "" : "TrustFirst Solutions"}
        width={320}
        height={320}
        decoding="async"
        className={styles.animationFallback}
        data-testid="brand-animation-fallback"
      />

      {useVideo ? (
        <video
          className={styles.animationVideo}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          playsInline
          loop={loop}
          preload={preload}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
          data-testid="brand-animation-video"
        />
      ) : null}
    </div>
  );
}
