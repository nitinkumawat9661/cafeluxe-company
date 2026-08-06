import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  Layers3,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { SearchFaq } from "@/lib/seo/local-search";
import { SiteFooter } from "@/components/site-footer";
import { StickyNavigation } from "@/components/sticky-navigation";
import { WhatsAppFloating } from "@/components/whatsapp-floating";

const displayFontStyle = {
  fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
} as const;

const serviceSignals = [
  "Local SEO",
  "Performance Ads",
  "Website Systems",
  "Social Content",
  "Google Business Profile",
  "Lead Follow-up",
];

const services = [
  ["SEO & Local Search", "Improve technical foundations, page relevance, local search signals and Google visibility.", "/services/seo"],
  ["Google Ads", "Reach high-intent customers with focused campaigns, conversion tracking and useful landing pages.", "/services/google-ads"],
  ["Meta Ads", "Build discovery, remarketing and WhatsApp enquiry campaigns across Facebook and Instagram.", "/services/meta-ads"],
  ["Website Development", "Build fast, mobile-first websites with clear offers, trust signals and measurable lead paths.", "/services/websites"],
  ["Google Business Profile", "Strengthen categories, services, content and review workflows for local discovery.", "/services/google-business-profile-management"],
  ["Social Media & Content", "Create consistent content that explains the offer and supports search, ads and trust.", "/services/social-media-management"],
  ["Lead Generation", "Connect ads, pages, forms, WhatsApp and reporting so fewer enquiries are lost.", "/services/lead-generation-systems"],
  ["Automation & Follow-up", "Improve response speed, reminders and lead handling without replacing human sales conversations.", "/services/automation-follow-up-systems"],
] as const;

const processSteps = [
  ["01", "Audit", "Review visibility, ads, social presence, website clarity, tracking and follow-up.", Search],
  ["02", "Strategy", "Choose the channel mix, message, landing path and measurement plan.", Layers3],
  ["03", "Build & Launch", "Prepare campaigns, pages, content, tracking and lead routing.", Workflow],
  ["04", "Improve", "Use search data, campaign results and lead quality feedback to refine the system.", Gauge],
] as const;

const outcomes = [
  "Clearer visibility for relevant Sikar and Rajasthan searches",
  "Better Google Maps and Google Business Profile foundations",
  "Landing pages designed around calls, forms and WhatsApp enquiries",
  "Connected ad tracking instead of isolated campaign metrics",
  "Content that answers customer questions before the first conversation",
  "A practical follow-up path for new leads",
];

const commonGaps = [
  ["Visibility without relevance", "The business appears online, but not for the services and locations that matter commercially."],
  ["Traffic without conversion", "Ads or social posts create visits, but the offer, proof and next action are unclear."],
  ["Enquiries without follow-up", "Leads reach WhatsApp or forms, then response delays and inconsistent handling reduce quality."],
  ["Activity without measurement", "Reports show reach and clicks, but not which actions created useful conversations."],
] as const;

export function SikarGrowthLanding({
  whatsappHref,
  faqs,
}: {
  whatsappHref: string;
  faqs: SearchFaq[];
}) {
  return (
    <>
      <WhatsAppFloating />
      <StickyNavigation />
      <main className="trust-river-surface min-h-screen overflow-x-hidden bg-[#050504] text-[#f8efd9]">
        <section className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-32 md:px-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:pt-40">
          <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[rgba(201,155,71,.09)] blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.32)] bg-[rgba(201,155,71,.08)] px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[var(--gold)]">
              <MapPin size={15} /> Sikar, Rajasthan
            </p>
            <h1 className="mt-6 text-[clamp(3rem,6.4vw,6.25rem)] font-bold leading-[.91] tracking-[-0.065em]" style={displayFontStyle}>
              Digital growth built around <span className="text-[var(--gold)]">real customer actions.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#d6c8ae] md:text-lg">
              TrustFirst Solutions is a digital marketing agency in Sikar connecting SEO, performance ads, social content, websites, Google Business Profile and follow-up into one practical growth system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1">
                <MessageCircle size={18} /> Get a Free Growth Audit
              </a>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(201,155,71,.42)] px-6 py-4 text-sm font-black text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.1)]">
                Explore Services <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-[rgba(201,155,71,.3)] bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-6 shadow-[0_30px_100px_rgba(0,0,0,.35)] md:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[rgba(201,155,71,.13)] blur-3xl" aria-hidden="true" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Direct Answer</p>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.035em]" style={displayFontStyle}>What does a digital marketing agency in Sikar do?</h2>
              <p className="mt-4 text-sm leading-7 text-[#d6c8ae]">It helps a business become easier to find, easier to trust and easier to contact through local SEO, paid ads, content, website conversion, tracking and follow-up.</p>
              <div className="mt-6 grid gap-3">
                {["Search and Google Maps visibility", "Paid campaigns with measurable actions", "Website and landing-page conversion", "Lead capture, reporting and follow-up"].map((item) => (
                  <p key={item} className="flex items-start gap-3 text-sm font-bold"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--gold)]" /> {item}</p>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-12 md:px-6" aria-label="Core digital growth capabilities">
          <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSignals.map((signal, index) => (
              <div key={signal} className="flex items-center gap-3 bg-[#080706] px-5 py-4">
                <span className="text-[10px] font-black tracking-[.18em] text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-bold">{signal}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.27em] text-[var(--gold)]">Digital Marketing Services in Sikar</p>
            <h2 className="mt-4 text-[clamp(2.35rem,4.4vw,4.8rem)] font-bold leading-[.96] tracking-[-0.055em]" style={displayFontStyle}>One connected system for visibility, trust and conversion.</h2>
            <p className="mt-5 text-base leading-8 text-[#d6c8ae]">Each service should help the customer discover the business, understand the offer, take action and receive a timely response.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map(([title, description, href], index) => (
              <article key={title} className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(201,155,71,.38)] hover:bg-[rgba(201,155,71,.06)]">
                <span className="text-xs font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.03em]" style={displayFontStyle}>{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#d6c8ae]">{description}</p>
                <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]">View service <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.27em] text-[var(--gold)]">How We Work</p>
              <h2 className="mt-4 text-[clamp(2.35rem,4vw,4.5rem)] font-bold leading-[.96] tracking-[-0.055em]" style={displayFontStyle}>Structured enough to measure. Flexible enough to improve.</h2>
              <p className="mt-5 text-sm leading-7 text-[#d6c8ae]">A clear process keeps every page, campaign and follow-up step connected to the business objective.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2">
              {processSteps.map(([number, title, description, Icon]) => (
                <article key={number} className="bg-[#080706] p-6 md:p-7">
                  <div className="flex items-center justify-between"><span className="text-xs font-black tracking-[.2em] text-[var(--gold)]">STEP {number}</span><Icon size={20} className="text-[var(--gold)]" /></div>
                  <h3 className="mt-8 text-2xl font-bold tracking-[-0.035em]" style={displayFontStyle}>{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#d6c8ae]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[.03] p-6 md:p-8">
            <Search size={26} className="text-[var(--gold)]" />
            <p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">Local SEO & GEO</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]" style={displayFontStyle}>Make the business understandable to search engines and answer engines.</h2>
            <p className="mt-4 text-sm leading-7 text-[#d6c8ae]">Clear service pages, factual business information, useful answers, internal links and structured data help search and AI systems understand who you serve and what problems you solve.</p>
          </div>
          <div className="rounded-[2rem] border border-[rgba(201,155,71,.28)] bg-[rgba(201,155,71,.055)] p-6 md:p-8">
            <Target size={26} className="text-[var(--gold)]" />
            <p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">Practical Outcomes</p>
            <div className="mt-5 grid gap-4">{outcomes.map((outcome) => <p key={outcome} className="flex items-start gap-3 text-sm leading-7"><TrendingUp size={17} className="mt-1 shrink-0 text-[var(--gold)]" /> {outcome}</p>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-6">
          <div className="flex flex-col gap-5 border-t border-[rgba(201,155,71,.25)] pt-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.27em] text-[var(--gold)]">Common Growth Gaps</p><h2 className="mt-4 text-[clamp(2.35rem,4vw,4.5rem)] font-bold leading-[.96] tracking-[-0.055em]" style={displayFontStyle}>The problem is often between the channels, not inside one channel.</h2></div>
            <div className="inline-flex items-center gap-2 text-sm font-black text-[var(--gold)]"><BarChart3 size={18} /> Diagnose before scaling</div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {commonGaps.map(([title, description], index) => (
              <article key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[.025] p-6"><span className="text-xs font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3 text-xl font-bold tracking-[-0.03em]" style={displayFontStyle}>{title}</h3><p className="mt-3 text-sm leading-7 text-[#d6c8ae]">{description}</p></article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16 md:px-6">
          <div className="text-center"><p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">Sikar Digital Marketing FAQ</p><h2 className="mt-4 text-[clamp(2rem,4vw,3.8rem)] font-bold leading-tight tracking-[-0.045em]" style={displayFontStyle}>Answers customers and search systems can understand.</h2></div>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.4rem] border border-white/10 bg-white/[.035] p-5 open:border-[rgba(201,155,71,.35)]"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-black"><span>{faq.question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[var(--gold)] transition group-open:rotate-45">+</span></summary><p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-[#d6c8ae]">{faq.answer}</p></details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 md:px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(201,155,71,.38)] bg-white/[.04] p-7 text-center md:p-10"><ShieldCheck size={28} className="mx-auto text-[var(--gold)]" /><p className="mt-5 text-xs font-black uppercase tracking-[.24em] text-[var(--gold)]">Sikar • Jaipur • Rajasthan • India</p><h2 className="mt-4 text-[clamp(2rem,4vw,3.8rem)] font-bold tracking-[-0.045em]" style={displayFontStyle}>Start with the most important growth gap.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#d6c8ae]">Share your business, location and current marketing setup. We will identify a practical starting point without promising guaranteed leads or rankings.</p><a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-black text-black">Request Free Audit <ArrowRight size={17} /></a></div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
