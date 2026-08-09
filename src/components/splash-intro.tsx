"use client";

/**
 * Compatibility shim for the previous homepage-only splash.
 * The branded session intro now mounts once from the root layout so direct
 * visits to inner pages receive the same experience without navigation replays.
 */
export function SplashIntro() {
  return null;
}
