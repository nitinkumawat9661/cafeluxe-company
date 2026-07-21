"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SplashIntro() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const a = window.setTimeout(() => setFade(true), 1100);
    const b = window.setTimeout(() => setShow(false), 1650);

    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[99999] grid place-items-center overflow-hidden bg-[#050504]",
        "transition-opacity duration-500",
        fade ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="w-full max-w-[96vw] px-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-[rgba(201,155,71,.45)] bg-[rgba(201,155,71,.1)] shadow-[0_0_45px_rgba(201,155,71,.18)]">
          <Image src="/trustfirst-logo-original.png" alt="" width={64} height={64} className="h-full w-full object-cover" priority />
        </div>

        <div className="mt-6 whitespace-nowrap px-2 text-center text-[clamp(1.9rem,10.5vw,5rem)] font-black leading-none tracking-[-0.045em]">
          <span className="bg-[linear-gradient(90deg,#fff7df,#c99b47,#fff2c2)] bg-clip-text text-transparent">
            Trust
          </span>
          <span className="text-[#f8efd9]">First</span>
        </div>

        <p className="mt-4 text-xs font-black uppercase tracking-[.36em] text-[var(--gold)]">
          Solutions
        </p>
      </div>
    </div>
  );
}
