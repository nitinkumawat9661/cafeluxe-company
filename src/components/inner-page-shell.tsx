import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { StickyNavigation } from "@/components/sticky-navigation";
import { WhatsAppFloating } from "@/components/whatsapp-floating";

type InnerPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

export function InnerPageShell({
  eyebrow,
  title,
  description,
  children,
  ctaHref = "/contact",
  ctaLabel = "Start a Project",
}: InnerPageShellProps) {
  return (
    <>
      <WhatsAppFloating />
      <StickyNavigation />
      <main className="trust-river-surface min-h-screen overflow-x-hidden bg-[#050504] pt-32 text-[#f8efd9]">
        <div className="trust-river-bg" aria-hidden="true" />
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-10 md:px-6">
          <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">{eyebrow}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_.35fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-[clamp(2.55rem,5vw,5rem)] font-black leading-[.98] tracking-[-0.05em]">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#e7dac1] md:text-lg">{description}</p>
            </div>
            <a
              href={ctaHref}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5"
            >
              {ctaLabel} <ArrowRight size={17} />
            </a>
          </div>
        </section>

        {children}
        <SiteFooter />
      </main>
    </>
  );
}
