"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandAnimation } from "./BrandAnimation";
import styles from "./brand-state.module.css";

const INTRO_SEEN_KEY = "trustfirst:brand-intro:v1";
const INTRO_FADE_MS = 2250;
const INTRO_REMOVE_MS = 2600;

let introShownInMemory = false;

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function BrandIntro() {
  const pathname = usePathname();
  const excludedRoute = pathname.startsWith("/studio");
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (excludedRoute || introShownInMemory || shouldReduceMotion()) {
      return;
    }

    try {
      if (window.sessionStorage.getItem(INTRO_SEEN_KEY)) {
        introShownInMemory = true;
        return;
      }

      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Session storage can be unavailable in hardened/private browser modes.
      // The in-memory guard still prevents route-navigation replays.
    }

    introShownInMemory = true;

    timers.current.push(
      window.setTimeout(() => setVisible(true), 0),
      window.setTimeout(() => setLeaving(true), INTRO_FADE_MS),
      window.setTimeout(() => setVisible(false), INTRO_REMOVE_MS),
    );

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [excludedRoute]);

  if (excludedRoute || !visible) return null;

  return (
    <div
      className={[styles.intro, leaving ? styles.introLeaving : ""].filter(Boolean).join(" ")}
      aria-hidden="true"
      data-testid="brand-intro"
    >
      <div className={styles.introInner}>
        <BrandAnimation mode="video" preload="auto" loop={false} />
        <div className={styles.introName}>TrustFirst Solutions</div>
        <div className={styles.introTagline}>Growth • Technology • Digital Systems</div>
      </div>
    </div>
  );
}
