import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SoftwareHeroVisual } from "@/components/software-hero";
import { SplashIntro } from "@/components/splash-intro";
import { StickyNavigation } from "@/components/sticky-navigation";
import { WhatsAppFloating } from "@/components/whatsapp-floating";
import { WhyTrustFirst } from "@/components/why-trustfirst";
import { getSiteSettings } from "@/sanity/lib/site-settings";

const capabilities = [
  {
    number: "01",
    title: "Custom software",
    description: "Systems designed around your workflow, permissions, data and operational rules.",
  },
  {
    number: "02",
    title: "Web applications",
    description: "Customer portals, internal platforms and SaaS-style products built for real usage.",
  },
  {
    number: "03",
    title: "ERP & POS",
    description: "Billing, inventory, purchases, sales, staff operations and reporting in one controlled system.",
  },
  {
    number: "04",
    title: "Business automation",
    description: "Connected workflows that reduce repetitive work without hiding critical decisions from people.",
  },
  {
    number: "05",
    title: "Mobile applications",
    description: "Mobile-first operational apps, including offline-aware and staff-facing workflows.",
  },
  {
    number: "06",
    title: "AI integrations",
    description: "Applied AI inside useful business workflows, with human control where it matters.",
  },
];

const systems = [
  {
    label: "Restaurant operations",
    title: "CafeLuxe POS Suite",
    description: "Billing, QR ordering, staff workflows and restaurant operations designed as one connected system.",
    tags: ["POS", "QR Ordering", "Inventory", "Staff App"],
  },
  {
    label: "Commerce platform",
    title: "TrustFirst POS",
    description: "A billing and operations platform built around durable local data, business workflows and online synchronization.",
    tags: ["Billing", "Stock", "Offline-first", "Sync"],
  },
  {
    label: "Client operations",
    title: "ERP & Client Platforms",
    description: "Custom systems for businesses that need operational control, staff access, reporting and client-facing workflows.",
    tags: ["ERP", "Roles", "Reports", "Client Portal"],
  },
];

const process = [
  ["01", "Understand", "Map how the business works today, where errors happen and who needs to use the system."],
  ["02", "Define", "Turn the workflow into clear scope, data rules, permissions and release priorities."],
  ["03", "Build", "Implement in reviewable stages instead of disappearing until a final delivery."],
  ["04", "Verify", "Test the important flows, failure cases, mobile behaviour and operational safeguards."],
  ["05", "Evolve", "Improve the system as the business changes instead of treating launch as the end."],
];

const principles = [
  "Business workflow before feature list",
  "Production data treated carefully",
  "Mobile-first where operations demand it",
  "Clear scope and visible trade-offs",
];

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <SplashIntro />
      <WhatsAppFloating />
      <StickyNavigation />

      <main className="trust-river-surface min-h-screen overflow-x-hidden bg-[#050504] pb-24 text-[#f8efd9] md:pb-0" id="home">
        <div className="trust-river-bg" aria-hidden="true" />

        <section className="mx-auto max-w-[92rem] px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div className="hero-copy">
              <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--gold)]">
                Software Engineering Company · India
              </p>

              <h1 className="mt-6 max-w-[58rem] text-[clamp(3.3rem,7vw,7.4rem)] font-black leading-[.88] tracking-[-0.055em]">
                Software built around
                <br />
                <span className="text-[var(--gold)]">how your business actually works.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-[16px] leading-8 text-[#d6c8ae] md:text-lg">
                TrustFirst Solutions builds custom business software, web applications, ERP and POS systems,
                mobile apps and automation for businesses that need more than another generic tool.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-0.5"
                >
                  View our work <ArrowUpRight size={17} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(201,155,71,.4)] px-6 py-4 text-sm font-black text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.08)]"
                >
                  Discuss a project
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-2">
                {["Custom Software", "ERP & POS", "Web Apps", "Mobile", "Automation"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[.025] px-4 py-2 text-xs font-bold text-[#d6c8ae]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <SoftwareHeroVisual />
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto grid max-w-[92rem] gap-px px-5 md:grid-cols-4 md:px-8">
            {principles.map((principle, index) => (
              <div key={principle} className="border-b border-white/10 py-5 md:border-b-0 md:border-r md:px-5 first:md:pl-0 last:md:border-r-0">
                <span className="text-[10px] font-black tracking-[.18em] text-[var(--gold)]">0{index + 1}</span>
                <p className="mt-2 text-sm font-bold text-[#d6c8ae]">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[92rem] px-5 py-20 md:px-8 md:py-28" id="services">
          <div className="grid gap-7 lg:grid-cols-[.55fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">What we build</p>
              <h2 className="mt-4 max-w-xl text-[clamp(2.5rem,4.5vw,5rem)] font-black leading-[.95] tracking-[-0.045em]">
                Software for operations, not demos.
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#bcae94] md:text-base">
                The product has to survive actual staff, actual data, changing requirements and everyday business pressure.
              </p>
              <Link href="/services" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">
                Explore all capabilities <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {capabilities.map((capability) => (
                <article key={capability.number} className="group rounded-[1.5rem] border border-white/10 bg-white/[.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-[rgba(201,155,71,.3)] hover:bg-[rgba(201,155,71,.04)] md:p-6">
                  <span className="text-xs font-black tracking-[.18em] text-[var(--gold)]">{capability.number}</span>
                  <div className="mt-5 flex items-start justify-between gap-4"><h3 className="text-2xl font-black tracking-[-0.035em] text-[#f8efd9]">{capability.title}</h3><ArrowUpRight size={16} className="mt-1 text-[#645a49] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--gold)]" /></div>
                  <p className="mt-3 text-sm leading-7 text-[#bcae94]">{capability.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[92rem] px-5 py-16 md:px-8 md:py-24" id="products">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">Selected systems</p>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.5rem,4.5vw,5rem)] font-black leading-[.95] tracking-[-0.045em]">
                Proof is the software itself.
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">
              View products <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {systems.map((system, index) => (
              <article key={system.title} className="group flex min-h-[29rem] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#090806] p-6 transition hover:border-[rgba(201,155,71,.35)] md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--gold)]">{system.label}</span>
                  <span className="text-xs font-black text-[#665d4d]">0{index + 1}</span>
                </div>

                <div className="mt-10 h-px bg-[linear-gradient(90deg,rgba(201,155,71,.7),rgba(201,155,71,0))]" />

                <div className="mt-7 grid h-36 grid-cols-[.38fr_.62fr] gap-2 overflow-hidden rounded-[1.15rem] border border-white/10 bg-black/35 p-2" aria-hidden="true">
                  <div className="grid gap-2">
                    <span className="rounded-lg border border-[rgba(201,155,71,.18)] bg-[rgba(201,155,71,.06)]" />
                    <span className="rounded-lg border border-white/10 bg-white/[.025]" />
                  </div>
                  <div className="grid grid-rows-[.6fr_.4fr] gap-2">
                    <span className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.035),rgba(201,155,71,.035))]" />
                    <div className="grid grid-cols-3 gap-2">
                      <span className="rounded-md border border-white/10 bg-white/[.025]" />
                      <span className="rounded-md border border-white/10 bg-white/[.025]" />
                      <span className="rounded-md border border-[rgba(201,155,71,.16)] bg-[rgba(201,155,71,.045)]" />
                    </div>
                  </div>
                </div>

                <h3 className="mt-8 text-3xl font-black tracking-[-0.045em] text-[#f8efd9]">{system.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#bcae94]">{system.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {system.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-2 text-xs text-[#d6c8ae]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-10 text-xs font-black uppercase tracking-[.15em] text-[#8d806a]">
                  <span>TrustFirst system</span>
                  <ArrowUpRight size={16} className="text-[var(--gold)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[92rem] px-5 py-20 md:px-8 md:py-28">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.025] p-6 md:p-9">
            <div className="grid gap-8 lg:grid-cols-[.55fr_1fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">How we work</p>
                <h2 className="mt-4 text-[clamp(2.3rem,4vw,4.4rem)] font-black leading-[.96] tracking-[-0.045em]">
                  From messy workflow to dependable system.
                </h2>
              </div>

              <div className="grid gap-0">
                {process.map(([number, title, description]) => (
                  <article key={number} className="grid grid-cols-[auto_1fr] gap-5 border-b border-white/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
                    <span className="pt-1 text-xs font-black text-[var(--gold)]">{number}</span>
                    <div>
                      <h3 className="text-xl font-black text-[#f8efd9]">{title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#bcae94]">{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WhyTrustFirst />

        <section className="mx-auto max-w-[92rem] px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20" id="contact">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(201,155,71,.3)] bg-[linear-gradient(135deg,rgba(201,155,71,.10),rgba(255,255,255,.025),rgba(0,0,0,.35))] p-7 md:p-10">
            <div className="absolute right-[-8rem] top-[-8rem] h-64 w-64 rounded-full border border-[rgba(201,155,71,.12)]" aria-hidden="true" />
            <div className="relative max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">Start with the problem</p>
              <h2 className="mt-4 text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[.94] tracking-[-0.05em]">
                Need software that fits the business instead of fighting it?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d6c8ae] md:text-base">
                Tell us how the work happens today and what needs to improve. We can start from the workflow before talking about features.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex justify-center rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black">
                  Start a project
                </Link>
                <a
                  href={settings.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,155,71,.4)] px-6 py-4 text-sm font-black text-[var(--gold)]"
                >
                  <MessageCircle size={17} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
