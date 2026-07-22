import { FaqSection } from "@/components/faq-section";
import { GrowthAuditForm } from "@/components/growth-audit-form";
import { HeroGrowthVisual, LeadGenerationRail, ServiceStoryVisual } from "@/components/growth-visuals";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SplashIntro } from "@/components/splash-intro";
import { StickyNavigation } from "@/components/sticky-navigation";
import { WhatsAppFloating } from "@/components/whatsapp-floating";
import { WhyTrustFirst } from "@/components/why-trustfirst";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import { MapPin, MessageCircle, Search, Target } from "lucide-react";
import Link from "next/link";

const problems = [
  "Leads nahi aa rahi, even after regular posting.",
  "Google par business visibility weak hai.",
  "Ads chal rahe hain but clear results nahi mil rahe.",
  "Social media inconsistent hai aur brand trust build nahi ho raha.",
  "Website visitors aa rahe hain, par enquiry nahi karte.",
  "Follow-up system nahi hai, leads cold ho jaati hain.",
  "Customers competitors ke paas chale jaate hain.",
];

const serviceGroups = [
  {
    title: "Acquire",
    description: "Bring the right attention and enquiries into the business.",
    visual: "acquire",
    services: [
      ["Meta Ads", "/services/meta-ads"],
      ["Google Ads", "/services/google-ads"],
      ["Lead Generation Systems", "/services/lead-generation-systems"],
    ],
  },
  {
    title: "Build Trust",
    description: "Make the business look active, credible and easy to find.",
    visual: "content",
    services: [
      ["Social Media Management", "/services/social-media-management"],
      ["Content Strategy & Creation", "/services/content-strategy"],
      ["SEO", "/services/seo"],
      ["Google Business Profile", "/services/google-business-profile-management"],
    ],
  },
  {
    title: "Convert",
    description: "Turn clicks, visits and attention into real conversations.",
    visual: "conversion",
    services: [
      ["Websites", "/services/websites"],
      ["Landing Pages", "/services/landing-pages"],
    ],
  },
  {
    title: "Scale",
    description: "Improve follow-up, reporting and decision-making over time.",
    visual: "automation",
    services: [
      ["Automation & Follow-up", "/services/automation-follow-up-systems"],
      ["Growth Consultation", "/services/business-growth-consultation"],
    ],
  },
];

const auditChecks = [
  "Instagram / social presence",
  "Google Business visibility",
  "Ads opportunity",
  "Website / landing page issues",
  "Lead generation and follow-up gaps",
];

const process = [
  ["01", "Audit", "We review your current visibility, content, ads, website and lead flow."],
  ["02", "Strategy", "We define the clearest growth priorities before spending time or money."],
  ["03", "Setup", "We prepare campaigns, pages, tracking, content and follow-up paths."],
  ["04", "Launch", "We launch carefully with clear messaging and conversion intent."],
  ["05", "Optimize", "We improve based on data, lead quality and business feedback."],
  ["06", "Report & Scale", "You get simple updates and a practical path for the next stage."],
];

const serviceOptions = [
  "Free Digital Growth Audit / Not Sure",
  "Meta Ads",
  "Google Ads",
  "Social Media Management",
  "SEO",
  "Google Business Profile Management",
  "Website / Landing Page",
  "Lead Generation / Automation",
  "Business Growth Consultation",
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
        <JsonLd />

        <section className="hero-editorial mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:px-6 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">Digital Growth Agency</p>
            <h1 className="mt-5 max-w-[38rem] text-[clamp(2.4rem,4.8vw,5.2rem)] font-black leading-[1.02] tracking-[-0.045em]">
              Aap Business Sambhaliye, <span className="text-[var(--gold)]">Growth Hum Dekh Lenge.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#e7dac1]">
              We build connected growth systems for visibility, leads, conversion and follow-up through Ads, Content, SEO, Websites and Automation.
            </p>
            <p className="mt-5 inline-flex max-w-full rounded-full border border-[rgba(201,155,71,.28)] bg-white/[.035] px-4 py-3 text-sm font-black text-[var(--gold)]">
              Sikar • Jaipur • Rajasthan • Serving Businesses Across India
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#audit" className="inline-flex justify-center rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1">
                Get Free Growth Audit
              </a>
              <a href={settings.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,155,71,.42)] px-6 py-4 text-sm font-black text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.1)]">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <HeroGrowthVisual />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
          <div className="editorial-split grid gap-8 p-1 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Business Problems</p>
              <h2 className="mt-4 text-[clamp(2rem,3vw,3.3rem)] font-black leading-tight tracking-[-0.03em]">Growth usually stops before the customer ever calls.</h2>
              <p className="mt-4 text-[#d6c8ae]">Most businesses do not need random marketing. They need the weak points in visibility, offer, conversion and follow-up fixed in the right order.</p>
            </div>
            <div className="problem-list">
              {problems.map((problem, index) => (
                <article key={problem} className="problem-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-lg font-black leading-7 text-[#f8efd9]">{problem}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <span id="services" className="block scroll-mt-32" />
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
          <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Digital Growth Services</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">One connected system for attention, trust, conversion and scale.</h2>
          <div className="service-editorial-grid mt-8">
            {serviceGroups.map((group) => (
              <article key={group.title} className={`service-editorial-panel service-editorial-panel-${group.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <ServiceStoryVisual type={group.visual} />
                <h3 className="mt-5 text-2xl font-black text-[#f8efd9]">{group.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#d6c8ae]">{group.description}</p>
                {group.title === "Scale" && (
                  <div className="scale-flow" aria-label="Follow-up flow">
                    <span>New Lead</span>
                    <span>Reply</span>
                    <span>Reminder</span>
                  </div>
                )}
                <div className="mt-5 grid gap-2">
                  {group.services.map(([label, href]) => (
                    <Link key={href} href={href} className="service-text-link">
                      {label} →
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 md:px-6 md:py-10">
          <div className="growth-system-layout">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">How We Grow Businesses</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Growth works when every step connects to the next.</h2>
            <p className="growth-pull mt-6">
              A lead is not just captured once. It moves through attention, landing experience, conversation and follow-up until the business has a real chance to convert.
            </p>
            <div className="mt-8">
              <LeadGenerationRail />
            </div>
          </div>
        </section>

        <WhyTrustFirst />

        <section id="audit" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-10 md:px-6">
          <div className="grid gap-8 rounded-[2rem] border border-[rgba(201,155,71,.35)] bg-white/[.035] p-6 md:p-8 lg:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Free 5-Point Digital Growth Audit</p>
              <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Get a practical first look at what may be blocking growth.</h2>
              <p className="mt-4 text-[#d6c8ae]">Share basic business details and we will review the visible growth gaps. This is a starting audit, not a guaranteed-results promise.</p>
              <div className="mt-6 grid gap-3">
                {auditChecks.map((check) => (
                  <p key={check} className="flex items-center gap-3 text-sm font-bold text-[#f8efd9]"><Search size={16} className="text-[var(--gold)]" /> {check}</p>
                ))}
              </div>
              <a href={settings.whatsappHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.42)] px-5 py-3 text-sm font-black text-[var(--gold)]">
                <MessageCircle size={17} /> WhatsApp Us
              </a>
            </div>

            <GrowthAuditForm services={serviceOptions} />
          </div>
        </section>

        <section id="process" className="mx-auto max-w-6xl px-5 py-8 md:px-6 md:py-10">
          <div className="process-editorial">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Process</p>
            <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Simple, credible and focused on improvement.</h2>
            <div className="process-rail mt-7">
              {process.map(([n, t, d], index) => (
                <article key={t} className={index % 2 ? "process-rail-step process-rail-step-right" : "process-rail-step"}>
                  <span>{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 md:px-6 md:py-10" id="work">
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Results / Case Studies</p>
            <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Proof over promises.</h2>
            <p className="mt-3 max-w-2xl text-[#d6c8ae]">We’re documenting verified campaign and growth case studies. Until then, we only publish work and outcomes we can support with real context.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/work" className="inline-flex justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black">Explore our work</Link>
              <a href="#audit" className="inline-flex justify-center rounded-full border border-[rgba(201,155,71,.42)] px-5 py-3 text-sm font-black text-[var(--gold)]">Get Free Growth Audit</a>
            </div>
          </div>
        </section>

        <FaqSection />

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-6 md:px-6">
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.35)] bg-white/[.035] p-6 text-center md:p-8">
            <Target className="mx-auto text-[var(--gold)]" size={34} />
            <h2 className="mt-4 text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[-0.03em]">Ready to Find What’s Stopping Your Growth?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#d6c8ae]">Start with a free growth audit or message us directly on WhatsApp.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#audit" className="rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black">Get Free Growth Audit</a>
              <a href={settings.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,155,71,.42)] px-6 py-4 text-sm font-black text-[var(--gold)]"><MessageCircle size={18} /> WhatsApp Us</a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-14 md:px-6 md:pb-10">
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Our Location</p>
            <h2 className="mt-4 text-3xl font-black">{settings.address}</h2>
            <p className="mt-3 max-w-2xl text-[#d6c8ae]">Serving Sikar, Jaipur, Rajasthan and businesses across India.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="https://www.google.com/maps/search/?api=1&query=Sikar%2C%20Rajasthan%2C%20India" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 font-black text-black transition hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(201,155,71,.28)]"><MapPin size={18} /> Open in Google Maps</a>
              <a href="#audit" className="inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(201,155,71,.42)] px-5 py-3 font-black text-[var(--gold)]">Contact Us</a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
