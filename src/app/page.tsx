import { JsonLd } from "@/components/seo/json-ld";
import { SplashIntro } from "@/components/splash-intro";
import { LeadSuccess } from "@/components/lead-success";
import { ArrowUpRight, Building2, ChevronDown, Mail, MapPin, Navigation, PhoneCall, Users } from "lucide-react";

const bullets=["Free consultation & tailored solution","No obligation, friendly & transparent","Quick response within 24 hours","Secure & confidential"];
const contacts=[["Phone / WhatsApp","+91 74148 53321","Mon-Fri: 9:00 AM - 6:00 PM"],["Email Us","hello@trustfirstsolutions.in","We reply within 24 hours"],["Our Office","Sikar, Rajasthan","Remote projects across India"],["Business Hours","Mon-Fri: 8:00 AM - 6:00 PM","Saturday by appointment"]];
const faqs=["How soon will you respond?","How much does a project cost?","Can you sign an NDA?","What if I am not sure about my requirements?","Do you offer ongoing support?"];
function InstaIcon({size=19}:{size?:number}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="igGradient" x1="2" y1="22" x2="22" y2="2">
          <stop offset="0%" stopColor="#f58529"/>
          <stop offset="35%" stopColor="#dd2a7b"/>
          <stop offset="65%" stopColor="#8134af"/>
          <stop offset="100%" stopColor="#515bd4"/>
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#igGradient)"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.8"/>
      <circle cx="17" cy="7" r="1.2" fill="white"/>
    </svg>
  )
}

export default function Home(){
return <>
<SplashIntro />
<main className="trust-river-surface min-h-screen overflow-x-hidden bg-[#050504] pb-24 text-[#f8efd9] md:pb-0">
<div className="trust-river-bg" aria-hidden="true"></div>
<JsonLd/>
<section className="trust-topbar sticky top-0 z-50 border-b border-[rgba(201,155,71,.18)] bg-[#030302]/80 px-5 py-3 backdrop-blur-xl md:px-6">
  <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-bold text-[#d6c8ae] md:flex-row md:items-center md:justify-between">
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-full border border-[rgba(201,155,71,.32)] bg-[rgba(201,155,71,.08)] px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">TrustFirst Solutions</span>
      <span className="text-[#f8efd9]">Websites, Apps & Custom Software</span>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <a href="tel:+917414853321" className="inline-flex items-center gap-2 transition hover:text-[var(--gold)]"><PhoneCall size={15}/> +91 74148 53321</a>
      <a href="mailto:hello@trustfirstsolutions.in" className="inline-flex items-center gap-2 transition hover:text-[var(--gold)]"><Mail size={15}/> Email</a>
      <a href="https://www.google.com/maps?q=27.63305,75.16182" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-[var(--gold)]"><MapPin size={15}/> Sikar</a>
      <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-4 py-2 font-black text-black transition hover:-translate-y-0.5">Start Project <ArrowUpRight size={14}/></a>
    </div>
  </div>
</section>
<header className="sticky top-0 z-[90000] border-b border-white/10 bg-[#050504]/95"><nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><b className="text-xl"><span><span className="trust-shimmer">Trust</span>First Solutions</span></b></nav></header>

<section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:px-6 lg:grid-cols-[.86fr_1.14fr]">
<div>
<p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">Get in touch</p>
<h1 className="mt-5 max-w-[34rem] text-[clamp(2.4rem,4.6vw,4.9rem)] font-black leading-[1.02] tracking-[-0.045em]">Craft a Premium <span className="text-[var(--gold)]">Website, App</span> or <span className="text-[var(--gold)]">Software</span> That Clients Trust</h1>
<p className="mt-6 max-w-md text-[16px] leading-8 text-[#e7dac1]">We design refined digital experiences for serious brands that value trust, clarity, performance and a premium first impression.</p><div className="mt-5 inline-flex max-w-full rounded-full border border-[rgba(201,155,71,.28)] bg-white/[.035] px-4 py-3 text-sm font-black text-[var(--gold)]"><span className="hero-type-text">Websites • Apps • Software • Automation</span></div>
<div className="mt-6 grid gap-3">{bullets.map(b=><p key={b}>✓ {b}</p>)}</div>
</div>

<div className="relative min-h-[460px]">
<div className="absolute inset-0 rounded-full bg-[rgba(201,155,71,.14)] blur-3xl"></div>
<div className="relative rounded-[2rem] border border-[rgba(201,155,71,.28)] bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(201,155,71,.05),rgba(0,0,0,.5))] p-4 shadow-[0_35px_120px_rgba(0,0,0,.6)]">
<div className="rounded-[1.5rem] border border-white/10 bg-[#070604] p-5">
<div className="flex items-center justify-between border-b border-white/10 pb-4">
<b><span className="trust-shimmer">Trust</span>First Solutions</b>
<span className="live-status-pill rounded-full border border-[rgba(201,155,71,.35)] px-3 py-1 text-xs font-black text-[var(--gold)]"><span></span> Live Build</span>
</div>
<div className="grid gap-4 py-6 md:grid-cols-[1.15fr_.85fr]">
<div className="live-preview-main rounded-2xl border border-[rgba(201,155,71,.25)] bg-black/35 p-5">
<p className="text-xs uppercase tracking-[.25em] text-[var(--gold)]">Premium Project</p>
<h2 className="mt-3 text-3xl font-black leading-tight">Trusted website, app and software delivery.</h2>
<a href="#contact" className="mt-5 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black">Start Project →</a>
</div>
<div className="grid gap-3 text-sm">
<div className="live-flow-card rounded-xl border border-white/10 bg-white/[.035] p-4"><b className="text-[var(--gold)]">01 Strategy</b><p>Clear scope and direction</p><i></i></div>
<div className="live-flow-card delay-1 rounded-xl border border-white/10 bg-white/[.035] p-4"><b className="text-[var(--gold)]">02 Design</b><p>Premium visual experience</p><i></i></div>
<div className="live-flow-card delay-2 rounded-xl border border-white/10 bg-white/[.035] p-4"><b className="text-[var(--gold)]">03 Launch</b><p>Fast, clean deployment</p><i></i></div>
</div>
</div>
<div className="grid grid-cols-3 gap-3">
<a href="tel:+917414853321" className="grid h-14 place-items-center rounded-2xl border border-[rgba(201,155,71,.35)] text-[var(--gold)]"><PhoneCall size={20}/></a>
<a href="mailto:hello@trustfirstsolutions.in" className="grid h-14 place-items-center rounded-2xl border border-[rgba(201,155,71,.35)] text-[var(--gold)]"><Mail size={20}/></a>
<a href="https://www.instagram.com/trustfirstsolutions.in/" target="_blank" rel="noreferrer" className="grid h-14 place-items-center rounded-2xl border border-[rgba(201,155,71,.35)]"><InstaIcon size={20}/></a>
</div>
</div>
</div>
</div>
</section>
<section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
  <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
    <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Recent Work</p>
    <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">
      Practical digital systems built for real business use.
    </h2>
    <p className="mt-3 max-w-2xl text-[#d6c8ae]">
      We focus on useful products, clean user flow and systems that can actually help businesses operate better.
    </p>

    <div className="mt-7 grid gap-4 md:grid-cols-3">
      {[
        ["CafeLuxe QR Ordering","Restaurant QR ordering, billing flow and staff-side operations.","QR Menu, POS, KOT, Orders, Reports"],
        ["Business Website","Premium landing pages for service brands that need trust and leads.","Hero, Services, Contact, SEO Base"],
        ["Custom Dashboard","Admin panels and software screens for managing business data clearly.","Dashboard, Forms, Tables, Roles"]
      ].map(([t,d,f])=>(
        <article key={t} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">Project</p>
          <h3 className="mt-3 text-xl font-black">{t}</h3>
          <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{d}</p>
          <p className="mt-4 rounded-xl border border-[rgba(201,155,71,.18)] bg-black/20 p-3 text-xs font-bold text-[#f8efd9]">{f}</p>
          <a href="#contact" className="mt-5 inline-flex font-black text-[var(--gold)]">Build Similar Project →</a>
        </article>
      ))}
    </div>
  </div>
</section>
<section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
  <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
    <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Work Process</p>
    <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">
      A clear process from idea to launch.
    </h2>
    <p className="mt-3 max-w-2xl text-[#d6c8ae]">
      We keep the project simple, transparent and structured so clients always know what is happening next.
    </p>

    <div className="mt-7 grid gap-4 md:grid-cols-5">
      {[
        ["01","Requirement","We understand your business, goal and exact project need."],
        ["02","Structure","We plan pages, sections, features and user flow."],
        ["03","Design","We prepare premium UI direction before development."],
        ["04","Build","We develop, test and refine the website, app or software."],
        ["05","Launch","We deploy live and support after handover."]
      ].map(([n,t,d])=>(
        <article key={t} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <span className="text-sm font-black text-[var(--gold)]">{n}</span>
          <h3 className="mt-3 text-lg font-black">{t}</h3>
          <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{d}</p>
        </article>
      ))}
    </div>
  </div>
</section>
<section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
  <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
    <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Screen Anatomy</p>
    <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">
      Every screen is built with a clear structure.
    </h2>
    <p className="mt-3 max-w-2xl text-[#d6c8ae]">
      We design websites, apps and software in layers so the interface stays clean, scalable and easy to improve.
    </p>

    <div className="mt-7 grid gap-4 md:grid-cols-4">
      {[
        ["01","Page","A complete route or screen users open, like Home, Contact, Dashboard or Product."],
        ["02","Section","A meaningful block inside a page, like Hero, Services, Pricing, FAQ or Contact."],
        ["03","Container","A responsive wrapper that controls spacing, alignment and readable width."],
        ["04","Component","Reusable UI parts like cards, buttons, forms, modals, tables and status blocks."]
      ].map(([n,t,d])=>(
        <article key={t} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <span className="text-sm font-black text-[var(--gold)]">{n}</span>
          <h3 className="mt-3 text-xl font-black">{t}</h3>
          <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{d}</p>
        </article>
      ))}
    </div>
  </div>
</section>
<section id="contact" className="mx-auto max-w-6xl px-5 pb-6 md:px-6">
<form action="/api/contact" method="POST" className="rounded-[2rem] border border-[rgba(201,155,71,.35)] bg-white/[.035] p-6 md:p-8">
<h2 className="text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[-0.03em]">Send Us a Message</h2>
<p className="mt-2 text-[#d6c8ae]">Validated lead form. Clean details will be sent directly to Telegram.</p><LeadSuccess />

<div className="mt-6 grid gap-4 md:grid-cols-2">
<input required minLength={2} maxLength={60} name="name" placeholder="Full Name *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none"/>
<input required minLength={10} maxLength={13} inputMode="numeric" pattern="[0-9]{10,13}" name="phone" placeholder="Phone / WhatsApp *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none"/>
<input type="email" maxLength={80} name="email" placeholder="Email Address" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none"/>
<input maxLength={70} name="business" placeholder="Business Name" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none"/>

<div className="md:col-span-2">
<p className="mb-3 text-sm font-black text-[var(--gold)]">Service Needed *</p>
<div className="grid gap-3 sm:grid-cols-4">
{["Website","App Development","Custom Software","UI/UX Design"].map((x)=><label key={x} className="contact-service-card"><input required type="radio" name="service" value={x}/><span>{x}</span></label>)}
</div>
</div>

<input required type="number" min={100} max={9999999} name="budget" placeholder="Estimated Budget ₹ *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2"/>

<textarea required minLength={10} maxLength={500} name="message" rows={4} placeholder="Describe your project in 10 to 500 characters *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2"/>

<button className="rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-black md:col-span-2">Send Message →</button>
</div>
</form>
</section>

<section className="mx-auto grid max-w-6xl gap-4 px-5 pb-6 sm:grid-cols-2 md:px-6 xl:grid-cols-4">{contacts.map(([a,b,c])=><article key={a} className="rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">{a}</p><h3 className="mt-3 break-words font-black">{b}</h3><p className="mt-2 text-sm text-[#d6c8ae]">{c}</p></article>)}</section>



<section className="mx-auto max-w-6xl px-5 pb-10 md:px-6"><p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Frequently Asked Questions</p><h2 className="mt-3 text-[clamp(1.9rem,2.8vw,3rem)] font-black leading-tight tracking-[-0.03em]">Got Questions? We&apos;ve Got Answers.</h2><div className="mt-5 grid gap-2">{faqs.map(q=><div key={q} className="flex justify-between rounded-xl border border-white/10 bg-white/[.035] px-5 py-4 font-bold"><span>{q}</span><span className="text-[var(--gold)]"><ChevronDown size={18} strokeWidth={2}/></span></div>)}</div></section>



<section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 md:px-6 lg:grid-cols-2">
<div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6">
<p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Our Location</p>
<h2 className="mt-4 text-3xl font-black">Sikar, Rajasthan</h2>
<p className="mt-3 max-w-sm text-[#d6c8ae]">Remote-first premium digital studio working with businesses across India.</p>

<div className="mt-8 flex flex-wrap gap-3">
<div className="inline-flex items-center gap-3 rounded-full border border-[rgba(201,155,71,.35)] bg-black/40 px-5 py-3 font-black text-[var(--gold)]"><MapPin size={18}/> TrustFirst Base</div>
<a href="https://www.google.com/maps?q=27.63305,75.16182" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-5 py-3 font-black text-black transition hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(201,155,71,.28)]"><Navigation size={18}/> Open in Google Maps</a>
</div>

<div className="trust-location-shell mt-6">
  <div className="trust-location-glow"></div>
  <div className="trust-location-map overflow-hidden rounded-[1.7rem] border border-[rgba(201,155,71,.28)] bg-[rgba(10,8,6,.82)] backdrop-blur-xl">
    <div className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,.08)] px-5 py-4">
      <div>
        <p className="text-xs font-black uppercase tracking-[.22em] text-[var(--gold)]">Satellite Preview</p>
        <b className="text-sm text-[#f8efd9]">TrustFirst Solutions Location</b>
        <p className="mt-1 text-xs text-[#d6c8ae]">27.63305, 75.16182</p>
      </div>
      <span className="rounded-full border border-[rgba(201,155,71,.32)] bg-black/30 px-3 py-1 text-xs font-black text-[var(--gold)]">Live View</span>
    </div>
    <div className="relative h-64 overflow-hidden">
      <iframe title="TrustFirst Solutions Satellite Location" src="https://maps.google.com/maps?q=27.63305,75.16182&t=k&z=17&output=embed" loading="lazy" className="trust-location-iframe h-full w-full"/>
      <div className="trust-location-overlay"></div>
    </div>
  </div>
</div>
</div>

<div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6">
<p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Office Preview</p>
<h2 className="mt-4 text-3xl font-black">Built for serious project work.</h2>
<div className="mt-6 grid gap-3">
{[["Strategy Desk","Project planning and requirement clarity"],["Design Review","Premium UI direction before development"],["Support Flow","Clean handover and post-launch support"]].map(([a,b],i)=><div key={a} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,155,71,.35)] text-[var(--gold)]">{i===0?<Navigation size={18}/>:i===1?<Building2 size={18}/>:<Users size={18}/>}</span><div><b>{a}</b><p className="text-sm text-[#d6c8ae]">{b}</p></div></div>)}
</div>
</div>
</section>
<footer className="border-t border-white/10 px-5 py-10 md:px-6"><div className="mx-auto grid max-w-6xl gap-8 text-sm text-[#d6c8ae] md:grid-cols-4"><div><b className="text-xl text-white"><span><span className="trust-shimmer">Trust</span>First Solutions</span></b><p className="mt-3">Premium websites, apps and software systems.</p></div><div><b>Quick Links</b><p className="mt-3">Home<br/>Services<br/>Pricing<br/>Contact</p></div><div><b>Services</b><p className="mt-3">Website Design<br/>App Development<br/>Custom Software<br/>UI/UX Design</p></div><div><b>Contact</b><div className="mt-3 grid gap-3"><a href="tel:+917414853321" className="flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"><PhoneCall size={17} strokeWidth={1.9}/> Call Now</a><a href="mailto:hello@trustfirstsolutions.in" className="flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"><Mail size={17} strokeWidth={1.9}/> Email Us</a><a href="https://www.instagram.com/trustfirstsolutions.in/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.3)] px-4 py-3 text-[#f7ecd2]"><InstaIcon size={17}/> Instagram <ArrowUpRight size={15} strokeWidth={1.9}/></a></div></div></div><p className="mt-8 text-center text-sm text-[#d6c8ae]">© 2026 TrustFirst Solutions. All rights reserved.</p></footer>

</main>
</>
}



























































