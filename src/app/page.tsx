import { FaqSection } from "@/components/faq-section";
import { GrowthAuditForm } from "@/components/growth-audit-form";
import { GrowthGapsVisual, GrowthSystemVisual, HeroGrowthVisual, ServiceChapterVisual } from "@/components/growth-visuals";
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
  {
    title: "Leads nahi aa rahi.",
    description: "Attention aa rahi hai, enquiry nahi.",
  },
  {
    title: "Google visibility weak hai.",
    description: "Local customers competitors ko pehle dekh rahe hain.",
  },
  {
    title: "Ads chal rahe hain, results clear nahi.",
    description: "Traffic aa raha hai, journey connected nahi.",
  },
  {
    title: "Social media inconsistent hai.",
    description: "Business active aur trustworthy nahi lagta.",
  },
  {
    title: "Website visitors convert nahi karte.",
    description: "Offer aur next action clear nahi hai.",
  },
  {
    title: "Follow-up system missing hai.",
    description: "Interested leads quietly cold ho jaati hain.",
  },
];

const serviceGroups = [
  {
    number: "01",
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
    number: "02",
    title: "Build Trust",
    description: "Make the business look active, credible and easy to find.",
    visual: "trust",
    services: [
      ["Social Media Management", "/services/social-media-management"],
      ["Content Strategy & Creation", "/services/content-strategy"],
      ["SEO", "/services/seo"],
      ["Google Business Profile", "/services/google-business-profile-management"],
    ],
  },
  {
    number: "03",
    title: "Convert",
    description: "Turn clicks, visits and attention into real conversations.",
    visual: "conversion",
    services: [
      ["Websites", "/services/websites"],
      ["Landing Pages", "/services/landing-pages"],
    ],
  },
  {
    number: "04",
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

        <section className="hero-editorial mx-auto grid max-w-[98rem] items-center gap-7 px-5 py-12 md:px-6 lg:grid-cols-[.4fr_.6fr]">
          <div className="hero-copy">
            <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">Digital Growth Agency</p>
            <h1 className="mt-5 max-w-[42rem] text-[clamp(3rem,5.7vw,6rem)] font-black leading-[.96] tracking-[-0.045em]">
              Aap Business <br className="hero-mobile-break" />
              Sambhaliye, <br />
              <span className="text-[var(--gold)]">
                Growth Hum <br className="hero-mobile-break" />
                Dekh Lenge.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#e7dac1]">
              We help businesses get seen, generate leads, convert better and build follow-up systems through Ads, Content, SEO, Websites and Automation.
            </p>
            <p className="mt-5 inline-flex max-w-full rounded-full border border-[rgba(201,155,71,.28)] bg-white/[.035] px-4 py-3 text-sm font-black text-[var(--gold)]">
              Sikar • Jaipur • Rajasthan • Serving Across India
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

        <section className="growth-gaps-section mx-auto max-w-[98rem] px-5 py-10 md:px-6" id="growth-gaps">
          <div className="growth-gaps-stage">
            <div className="growth-gaps-copy">
              <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--gold)]">Business Growth Gaps</p>
              <h2 className="mt-4 text-[clamp(2.35rem,4vw,4.6rem)] font-black leading-[.98] tracking-[-0.045em]">
                Growth usually stops
                <br />
                before the customer
                <br />
                ever calls.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#d6c8ae]">
                Customers discover, compare and decide online long before they start a conversation. Small gaps across visibility, trust, conversion and follow-up can quietly send them somewhere else.
              </p>
            </div>
            <GrowthGapsVisual />
          </div>

          <div className="problem-list growth-gaps-list">
              {problems.map((problem, index) => (
                <article key={problem.title} className="problem-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{problem.title}</h3>
                    <p>{problem.description}</p>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <span id="services" className="block scroll-mt-32" />
        <section className="services-journey-section mx-auto max-w-[98rem] px-5 py-12 md:px-6">
          <div className="services-journey-heading">
            <p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">Digital Growth Services</p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2.35rem,4vw,4.7rem)] font-black leading-[.98] tracking-[-0.045em]">
              One connected system for attention, trust, conversion and scale.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#d6c8ae]">
              Each service has a role in the customer journey, so the business does not rely on one disconnected campaign, one post or one landing page to do everything.
            </p>
          </div>

          <div className="services-chapter-stack mt-10">
            {serviceGroups.map((group, index) => (
              <article key={group.title} className={`services-chapter services-chapter-${group.visual}`}>
                <div className="services-chapter-copy">
                  <span>{group.number}</span>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  {group.title === "Scale" && (
                    <div className="scale-flow" aria-label="Follow-up flow">
                      <span>New Lead</span>
                      <span>Reply</span>
                      <span>Reminder</span>
                    </div>
                  )}
                  <div className="services-link-list" aria-label={`${group.title} services`}>
                    {group.services.map(([label, href]) => (
                      <Link key={href} href={href} className="service-text-link">
                        {label} →
                      </Link>
                    ))}
                  </div>
                </div>
                <ServiceChapterVisual type={group.visual} priority={index < 2} />
              </article>
            ))}
          </div>
        </section>

        <section className="growth-system-section mx-auto max-w-[98rem] px-5 py-12 md:px-6">
          <div className="growth-system-heading">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">How We Grow Businesses</p>
            <h2>Growth works when<br className="hidden md:block" /> every step connects.</h2>
            <p>Attention alone is not enough. Every step from discovery to follow-up must move the customer forward.</p>
          </div>

          <div className="growth-system-stage">
            <GrowthSystemVisual />
            <div className="growth-system-stage-list" aria-label="Growth system stages">
              {[
                ["01", "Discover", "Search · Social · Ads · Maps"],
                ["02", "Trust", "Content · Reviews · Local Presence"],
                ["03", "Click", "Offer · CTA · Landing Experience"],
                ["04", "Capture", "Form · Lead Notification"],
                ["05", "Conversation", "WhatsApp · Calls"],
                ["06", "Follow-up", "Reply · Reminder · Automation"],
                ["07", "Grow", "Optimize · Report · Scale"],
              ].map(([number, title, descriptor]) => (
                <div key={number} className="growth-system-stage-item">
                  <span>{number}</span>
                  <div>
                    <b>{title}</b>
                    <p>{descriptor}</p>
                  </div>
                </div>
              ))}
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
