"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SPLASH_SEEN_KEY = "trustfirst:splash-seen";

export function SplashIntro() {
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (window.sessionStorage.getItem(SPLASH_SEEN_KEY) || reduceMotion) {
      return;
    }

    window.sessionStorage.setItem(SPLASH_SEEN_KEY, "true");

    const start = window.setTimeout(() => setShow(true), 0);
    const a = window.setTimeout(() => setFade(true), 1180);
    const b = window.setTimeout(() => setShow(false), 1580);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={[
        "splash-cinematic fixed inset-0 z-[99999] grid place-items-center overflow-hidden bg-[#030302]",
        "transition-opacity duration-400",
        fade ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="splash-gold-line" aria-hidden="true" />
      <div className="splash-cinematic-center w-full max-w-[96vw] px-6 text-center">
        <div className="splash-logo-reveal mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-[1.35rem] border border-[rgba(201,155,71,.38)] bg-[rgba(201,155,71,.08)] shadow-[0_0_45px_rgba(201,155,71,.16)]">
          <Image src="/trustfirst-logo-original.png" alt="" width={80} height={80} className="h-full w-full object-cover" priority />
        </div>

        <div className="splash-wordmark mt-5 whitespace-nowrap px-2 text-center text-[clamp(1.9rem,9vw,4.2rem)] font-black leading-none tracking-[-0.045em]">
          <span className="bg-[linear-gradient(90deg,#fff7df,#c99b47,#fff2c2)] bg-clip-text text-transparent">
            Trust
          </span>
          <span className="text-[#f8efd9]">First</span>
        </div>

        <p className="splash-tagline mt-4 text-[10px] font-black uppercase tracking-[.3em] text-[var(--gold)] sm:text-xs">
          Digital Growth Agency
        </p>
      </div>
    </div>
  );
}
