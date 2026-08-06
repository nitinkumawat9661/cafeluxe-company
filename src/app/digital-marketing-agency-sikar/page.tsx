import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Search, Target, TrendingUp } from "lucide-react";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { SiteFooter } from "@/components/site-footer";
import { StickyNavigation } from "@/components/sticky-navigation";
import { WhatsAppFloating } from "@/components/whatsapp-floating";
import { createSeoMetadata } from "@/lib/seo";
import { localSearchKeywords, sikarLandingFaqs } from "@/lib/seo/local-search";
import {
  faqPageSchema,
  localLandingPageSchema,
  organizationSchema,
  siteServiceSchemas,
  websiteSchema,
} from "@/lib/seo/structured-data";
import { getSiteSettings } from "@/sanity/lib/site-settings";

const path = "/digital-marketing-agency-sikar";

const services = [
  {
    title: "SEO & Local Search",
    description: "Improve technical foundations, page relevance, local search signals and Google visibility for the services customers are actively searching for.",
    href: "/services/seo",
  },
  {
    title: "Google Ads",
    description: "Reach high-intent customers with focused campaigns, conversion tracking and landing pages built around clear business actions.",
    href: "/services/google-ads",
  },
  {
    title: "Meta Ads",
    description: "Create campaign systems for discovery, remarketing, WhatsApp enquiries and lead generation across Facebook and Instagram.",
    href: "/services/meta-ads",
  },
  {
    title: "Website Development",
    description: "Build fast, mobile-first websites and landing pages with clear offers, trust signals, local relevance and measurable lead paths.",
    href: "/services/websites",
  },
  {
    title: "Google Business Profile",
    description: "Strengthen categories, services, business information, content and review workflows for better local discovery and customer trust.",
    href: "/services/google-business-profile-management",
  },
  {
    title: "Social Media & Content",
    description: "Create a consistent content system that explains the offer, builds credibility and supports ads, search and follow-up conversations.",
    href: "/services/social-media-management",
  },
  {
    title: "Lead Generation",
    description: "Connect ads, pages, forms, WhatsApp and reporting so enquiries reach the right person with less leakage between steps.",
    href: "/services/lead-generation-systems",
  },
  {
    title: "Automation & Follow-up",
    description: "Improve response speed, reminders and lead handling without replacing the human conversation that closes the sale.",
    href: "/services/automation-follow-up-systems",
  },
];

const outcomes = [
  "Clearer visibility for relevant Sikar and Rajasthan searches",
  "Better Google Maps and Google Business Profile foundations",
  "Landing pages designed around calls, forms and WhatsApp enquiries",
  "Connected ad tracking instead of isolated campaign metrics",
  "Content that answers customer questions before the first conversation",
  "A practical follow-up path for new leads",
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await createSeoMetadata({
      title: "Digital Marketing Agency in Sikar",
      description:
        "TrustFirst Solutions provides SEO, Google Ads, Meta Ads, social media marketing, website development, Google Business Profile, lead generation and automation services in Sikar, Rajasthan.",
      path,
      imageAlt: "TrustFirst Solutions digital marketing agency in Sikar",
    })),
    keywords: localSearchKeywords,
  };
}

export default async function DigitalMarketingAgencySikarPage() {
  const settings = await getSiteSettings();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(settings),
      websiteSchema(settings),
      localLandingPageSchema(settings, path),
      ...siteServiceSchemas(settings),
      faqPageSchema(sikarLandingFaqs),
    ],
  };

  return (
    <>
      <WhatsAppFloating />
      <StickyNavigation />
      <main className="trust-river-surface min-h-screen overflow-x-hidden bg-[#050504] text-[#f8efd9]">
        <JsonLdScript data={schema} />

        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-32 md:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-40">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.32)] bg-[rgba(201,155,71,.08)] px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[var(--gold)]">
              <MapPin size={15} /> Sikar, Rajasthan
            </p>
            <h1 className="mt-6 text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[.94] tracking-[-0.05em]">
              Digital Marketing Agency in Sikar for Visibility, Leads and Growth.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d6c8ae] md:text-lg">
              TrustFirst Solutions helps local businesses connect SEO, Google Ads, Meta Ads, social media, websites, Google Business Profile and follow-up into one practical growth system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={settings.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1"
              >
                <MessageCircle size={18} /> Get a Free Growth Audit
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,155,71,.42)] px-6 py-4 text-sm font-black text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.1)]"
              >
                Explore Services <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[rgba(201,155,71,.3)] bg-white/[.035] p-6 shadow-[0_30px_100px_rgba(0,0,0,.35)] md:p-8">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Direct Answer</p>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">What does a digital marketing agency in Sikar do?</h2>
            <p className="mt-4 text-sm leading-7 text-[#d6c8ae]">
              It helps a business become easier to find, easier to trust and easier to contact. The work can include local SEO, Google Maps visibility, paid ads, content, website conversion, lead tracking and follow-up.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Search and Google Maps visibility",
                "Paid campaigns with measurable actions",
                "Website and landing-page conversion",
                "Lead capture, reporting and follow-up",
              ].map((item) => (
                <p key={item} className="flex items-start gap-3 text-sm font-bold text-[#f8efd9]">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" /> {item}
                </p>
              ))}
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.27em] text-[var(--gold)]">Digital Marketing Services in Sikar</p>
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,4.2rem)] font-black leading-[.98] tracking-[-0.045em]">
              Services connected around the customer journey.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#d6c8ae]">
              The goal is not to sell disconnected activities. Each service should help the customer discover the business, understand the offer, take action and receive a timely response.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.title} className="rounded-[1.6rem] border border-white/10 bg-white/[.035] p-6 transition hover:border-[rgba(201,155,71,.35)] hover:bg-[rgba(201,155,71,.06)]">
                <span className="text-xs font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-black tracking-[-0.025em]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#d6c8ae]">{service.description}</p>
                <Link href={service.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">
                  View service <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.03] p-6 md:p-8">
            <Search size={26} className="text-[var(--gold)]" />
            <p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">Local SEO & GEO</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Make the business understandable to search engines and answer engines.</h2>
            <p className="mt-4 text-sm leading-7 text-[#d6c8ae]">
              Clear service pages, factual business information, useful answers, internal links and structured data help Google and AI-powered discovery systems understand who you serve, where you work and what problems you solve.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[rgba(201,155,71,.28)] bg-[rgba(201,155,71,.055)] p-6 md:p-8">
            <Target size={26} className="text-[var(--gold)]" />
            <p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">Practical Outcomes</p>
            <div className="mt-5 grid gap-4">
              {outcomes.map((outcome) => (
                <p key={outcome} className="flex items-start gap-3 text-sm leading-7 text-[#f8efd9]">
                  <TrendingUp size={17} className="mt-1 shrink-0 text-[var(--gold)]" /> {outcome}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-6">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">Sikar Digital Marketing FAQ</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.8rem)] font-black leading-tight tracking-[-0.04em]">
              Answers customers and search systems can understand.
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {sikarLandingFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.4rem] border border-white/10 bg-white/[.035] p-5 open:border-[rgba(201,155,71,.35)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-black">
                  <span>{faq.question}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[var(--gold)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-[#d6c8ae]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 md:px-6">
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.38)] bg-white/[.04] p-7 text-center md:p-10">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">Sikar • Jaipur • Rajasthan • India</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.8rem)] font-black tracking-[-0.04em]">Start with the most important growth gap.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#d6c8ae]">
              Share your business, location and current marketing setup. We will identify a practical starting point without promising guaranteed leads or rankings.
            </p>
            <a
              href={settings.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-black text-black"
            >
              Request Free Audit <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
