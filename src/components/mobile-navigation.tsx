"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { ResolvedSiteSettings } from "@/sanity/lib/site-settings";
import type { publicRoutes } from "@/lib/routes";

type MobileNavigationProps = {
  routes: typeof publicRoutes;
  settings: ResolvedSiteSettings;
};

export function MobileNavigation({ routes, settings }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.dataset.mobileMenuOpen = "true";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.mobileMenuOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
        className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(201,155,71,.38)] bg-black/35 text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.12)]"
      >
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>

      {open && <button aria-label="Close navigation overlay" className="fixed inset-0 top-[72px] z-[89990] bg-black/55 backdrop-blur-sm" onClick={() => setOpen(false)} />}

      <div
        id={panelId}
        className={[
          "fixed left-3 right-3 top-[76px] z-[90001] overflow-hidden rounded-[1.35rem] border border-[rgba(201,155,71,.32)] bg-[#070604]/96 shadow-[0_28px_90px_rgba(0,0,0,.62)] backdrop-blur-2xl transition motion-reduce:transition-none",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-[rgba(201,155,71,.45)] bg-black">
            <Image src={settings.logoUrl} alt="" width={44} height={44} className="h-full w-full object-cover" />
          </span>
          <div>
            <p className="text-sm font-black text-[#f8efd9]">{settings.name}</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[.2em] text-[var(--gold)]">Digital Growth Agency</p>
          </div>
        </div>

        <nav className="grid gap-1 p-3" aria-label="Mobile navigation">
          {routes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-black uppercase tracking-[.13em] text-[#e7dac1] transition hover:bg-white/[.06] hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-3 border-t border-white/10 p-4">
          <Link href="/#audit" onClick={() => setOpen(false)} className="rounded-full bg-[var(--gold)] px-5 py-3 text-center text-sm font-black text-black">
            Free Growth Audit
          </Link>
          <a href={settings.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,155,71,.35)] px-5 py-3 text-sm font-black text-[var(--gold)]">
            <MessageCircle size={17} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
