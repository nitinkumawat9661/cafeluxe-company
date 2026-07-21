import { FaqSection } from "@/components/faq-section";
import { LeadSuccess } from "@/components/lead-success";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SplashIntro } from "@/components/splash-intro";
import { StickyNavigation } from "@/components/sticky-navigation";
import { WhatsAppFloating } from "@/components/whatsapp-floating";
import { WhyTrustFirst } from "@/components/why-trustfirst";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import { Mail, MapPin, MessageCircle, PhoneCall, Search, Target } from "lucide-react";
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
    services: [
      ["Meta Ads", "/services/meta-ads"],
      ["Google Ads", "/services/google-ads"],
      ["Lead Generation Systems", "/services/lead-generation-systems"],
    ],
  },
  {
    title: "Build Trust",
    description: "Make the business look active, credible and easy to find.",
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
    services: [
      ["Websites", "/services/websites"],
      ["Landing Pages", "/services/landing-pages"],
    ],
  },
  {
    title: "Scale",
    description: "Improve follow-up, reporting and decision-making over time.",
    services: [
      ["Automation & Follow-up", "/services/automation-follow-up-systems"],
      ["Growth Consultation", "/services/business-growth-consultation"],
    ],
  },
];

const growthSystem = [
  ["ATTRACT", "Attention + Visibility"],
  ["CONVERT", "Offer + Landing Experience"],
  ["CAPTURE", "Lead Capture + Follow-up"],
  ["IMPROVE", "Conversion + Optimization"],
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

function InstaIcon({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="igGradient" x1="2" y1="22" x2="22" y2="2">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="35%" stopColor="#dd2a7b" />
          <stop offset="65%" stopColor="#8134af" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#igGradient)" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.2" fill="white" />
    </svg>
  );
}

export default async function Home() {
  const settings = await getSiteSettings();
  const primarySocialLink = settings.socialLinks[0];

  return (
    <>
      <SplashIntro />
      <WhatsAppFloating />
      <StickyNavigation />
      <main className="trust-river-surface min-h-screen overflow-x-hidden bg-[#050504] pb-24 text-[#f8efd9] md:pb-0" id="home">
        <div className="trust-river-bg" aria-hidden="true" />
        <JsonLd />

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:px-6 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">Digital Growth Agency</p>
            <h1 className="mt-5 max-w-[38rem] text-[clamp(2.4rem,4.8vw,5.2rem)] font-black leading-[1.02] tracking-[-0.045em]">
              Aap Business Sambhaliye, <span className="text-[var(--gold)]">Growth Hum Dekh Lenge.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#e7dac1]">
              We help businesses generate more leads, improve online visibility and build systems that turn attention into customers through Ads, Content, SEO, Websites and Automation.
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

          <div className="relative md:min-h-[420px]">
            <div className="absolute inset-0 rounded-full bg-[rgba(201,155,71,.14)] blur-3xl" />
            <div className="relative rounded-[2rem] border border-[rgba(201,155,71,.28)] bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(201,155,71,.05),rgba(0,0,0,.5))] p-4 shadow-[0_35px_120px_rgba(0,0,0,.6)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#070604] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <b><span className="trust-shimmer">Trust</span>First Growth System</b>
                  <span className="live-status-pill rounded-full border border-[rgba(201,155,71,.35)] px-3 py-1 text-xs font-black text-[var(--gold)]"><span /> Lead Focused</span>
                </div>
                <div className="grid gap-4 py-5 md:grid-cols-[1.05fr_.95fr] md:py-6">
                  <div className="live-preview-main hidden rounded-2xl border border-[rgba(201,155,71,.25)] bg-black/35 p-5 md:block">
                    <p className="text-xs uppercase tracking-[.25em] text-[var(--gold)]">Free 5-Point Audit</p>
                    <h2 className="mt-3 text-3xl font-black leading-tight">Find what is stopping leads, visibility and conversions.</h2>
                    <a href="#audit" className="mt-5 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black">Get Audit →</a>
                  </div>
                  <div className="grid gap-3 text-sm">
                    <div className="live-flow-card rounded-xl border border-white/10 bg-white/[.035] p-4"><b className="text-[var(--gold)]">VISIBILITY</b><p>Search • Maps • Social</p><i /></div>
                    <div className="live-flow-card delay-1 rounded-xl border border-white/10 bg-white/[.035] p-4"><b className="text-[var(--gold)]">CONVERSION</b><p>Offer • Landing Page • Lead Capture</p><i /></div>
                    <div className="live-flow-card delay-2 rounded-xl border border-white/10 bg-white/[.035] p-4"><b className="text-[var(--gold)]">FOLLOW-UP</b><p>WhatsApp • Calls • Response Flow</p><i /></div>
                  </div>
                </div>
                <div className="hidden grid-cols-3 gap-3 md:grid">
                  <a href={settings.phoneHref} className="grid h-14 place-items-center rounded-2xl border border-[rgba(201,155,71,.35)] text-[var(--gold)]"><PhoneCall size={20} /></a>
                  <a href={`mailto:${settings.email}`} className="grid h-14 place-items-center rounded-2xl border border-[rgba(201,155,71,.35)] text-[var(--gold)]"><Mail size={20} /></a>
                  {primarySocialLink && <a href={primarySocialLink.url} target="_blank" rel="noreferrer" className="grid h-14 place-items-center rounded-2xl border border-[rgba(201,155,71,.35)]"><InstaIcon size={20} /></a>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
          <div className="grid gap-8 rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Business Problems</p>
              <h2 className="mt-4 text-[clamp(2rem,3vw,3.3rem)] font-black leading-tight tracking-[-0.03em]">Growth usually stops before the customer ever calls.</h2>
              <p className="mt-4 text-[#d6c8ae]">Most businesses do not need random marketing. They need the weak points in visibility, offer, conversion and follow-up fixed in the right order.</p>
            </div>
            <div className="grid gap-3">
              {problems.map((problem, index) => (
                <article key={problem} className="flex items-start gap-4 border-b border-white/10 py-3 last:border-b-0">
                  <span className="mt-1 text-sm font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
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
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceGroups.map((group) => (
              <article key={group.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <h3 className="text-2xl font-black text-[var(--gold)]">{group.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#d6c8ae]">{group.description}</p>
                <div className="mt-5 grid gap-2">
                  {group.services.map(([label, href]) => (
                    <Link key={href} href={href} className="rounded-xl border border-[rgba(201,155,71,.18)] bg-white/[.035] px-4 py-3 text-sm font-black text-[#f8efd9] transition hover:border-[rgba(201,155,71,.45)] hover:text-[var(--gold)]">
                      {label} →
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 md:px-6 md:py-10">
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(201,155,71,.04),rgba(0,0,0,.38))] p-5 md:p-8">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">How We Grow Businesses</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Growth works when every step connects to the next.</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {growthSystem.map(([title, desc], index) => (
                <article key={title} className="rounded-[1.1rem] border border-white/10 bg-black/25 p-4 md:p-5">
                  <span className="text-sm font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-base font-black md:text-lg">{title}</h3>
                  <p className="mt-1 text-xs font-bold leading-5 text-[#d6c8ae] md:text-sm">{desc}</p>
                </article>
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

            <form action="/api/contact" method="POST" className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
              <h3 className="text-2xl font-black">Get My Free Growth Audit</h3>
              <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">Clean details go directly to the TrustFirst lead flow.</p>
              <LeadSuccess />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input required minLength={2} maxLength={60} name="name" placeholder="Full Name *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                <input required minLength={10} maxLength={13} inputMode="numeric" pattern="[0-9]{10,13}" name="phone" placeholder="Phone / WhatsApp *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                <select required name="service" defaultValue="" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2">
                  <option value="" disabled>What help do you need? *</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <textarea required minLength={10} maxLength={500} name="message" rows={4} placeholder="Short business challenge *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2" />
                <details className="rounded-xl border border-white/10 bg-white/[.035] p-4 md:col-span-2">
                  <summary className="cursor-pointer text-sm font-black text-[var(--gold)]">Add more business details (optional)</summary>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <input maxLength={70} name="business" placeholder="Business Name" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                    <input maxLength={70} name="businessType" placeholder="Business Type" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                    <input maxLength={70} name="location" placeholder="Location" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                    <input maxLength={120} name="onlineUrl" placeholder="Website / Instagram URL" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />
                    <select name="budget" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2">
                      <option value="">Budget range optional</option>
                      <option>Not sure yet</option>
                      <option>Under ₹15k</option>
                      <option>₹15k-₹30k</option>
                      <option>₹30k-₹50k</option>
                      <option>₹50k+</option>
                    </select>
                  </div>
                </details>
                <button className="rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-black md:col-span-2">Get Free Growth Audit →</button>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-8 md:px-6 md:py-10">
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5 md:p-8">
            <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Process</p>
            <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Simple, credible and focused on improvement.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {process.map(([n, t, d]) => (
                <article key={t} className="rounded-[1.1rem] border border-white/10 bg-black/20 p-4">
                  <span className="text-sm font-black text-[var(--gold)]">{n}</span>
                  <h3 className="mt-2 text-base font-black">{t}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#d6c8ae]">{d}</p>
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
