import { JsonLd } from "@/components/seo/json-ld";
import { FloatingPreferences } from "@/components/floating-preferences";

const bullets=["Free consultation & tailored solution","No obligation, friendly & transparent","Quick response within 24 hours","Secure & confidential"];
const contacts=[["Phone / WhatsApp","+91 74148 53321","Mon-Fri: 9:00 AM - 6:00 PM"],["Email Us","hello@luxeforgestudio.com","We reply within 24 hours"],["Our Office","Sikar, Rajasthan","Remote projects across India"],["Business Hours","Mon-Fri: 8:00 AM - 6:00 PM","Saturday by appointment"]];
const faqs=["How soon will you respond?","How much does a project cost?","Can you sign an NDA?","What if I am not sure about my requirements?","Do you offer ongoing support?"];
const office=["Modern Workspace","Client Meeting Rooms","Creative Environment"];

export default function Home(){
return <main className="min-h-screen overflow-x-hidden bg-[#050504] pb-24 text-[#f8efd9] md:pb-0">
<JsonLd/>
<header className="sticky top-0 z-[90000] border-b border-white/10 bg-[#050504]/95"><nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><b className="text-xl">LuxeForge <span className="text-[var(--gold)]">Studio</span></b><a href="#contact" className="rounded-full border border-[rgba(201,155,71,.45)] px-5 py-3 text-sm font-black">Start Project</a></nav></header>

<section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:px-6 lg:grid-cols-[.85fr_1.15fr]">
<div><p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">Get in touch</p><h1 className="mt-5 max-w-[34rem] text-[clamp(2.4rem,4.6vw,4.9rem)] font-black leading-[1.02] tracking-[-0.045em]">Craft a Premium <span className="text-[var(--gold)]">Website, App</span> or <span className="text-[var(--gold)]">Software</span> That Clients Trust</h1><p className="mt-6 max-w-md text-[16px] leading-8 text-[#e7dac1]">We design refined digital experiences for serious brands that value trust, clarity, performance and a premium first impression.</p><div className="mt-6 grid gap-3">{bullets.map(b=><p key={b}>✓ {b}</p>)}</div></div>
<div className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-[rgba(201,155,71,.28)] bg-[radial-gradient(circle_at_center,rgba(201,155,71,.24),transparent_55%)] p-5 md:min-h-[360px] md:p-8">
<div className="mx-auto h-64 w-44 rotate-0 rounded-[1.7rem] border border-white/20 bg-[#090704] p-5 shadow-2xl md:h-80 md:w-56 md:rotate-6 md:rounded-[2rem] md:p-6"><b className="text-[var(--gold)]">LuxeForge Studio</b><h2 className="mt-10 text-xl font-black md:mt-16 md:text-2xl">Let&apos;s build something amazing.</h2><button className="mt-8 rounded-full bg-[var(--gold)] px-4 py-3 font-black text-black">Start a conversation →</button></div>
<div className="hidden absolute right-8 top-16 rounded-2xl border border-[rgba(201,155,71,.35)] bg-black/50 p-5 md:block"><b className="text-[var(--gold)]">Call Us</b><p>+91 74148 53321</p></div>
<div className="hidden absolute bottom-16 right-8 rounded-2xl border border-[rgba(201,155,71,.35)] bg-black/50 p-5 md:block"><b className="text-[var(--gold)]">Email Us</b><p>hello@luxeforgestudio.com</p></div>
</div>
</section>

<section id="contact" className="mx-auto max-w-6xl px-5 pb-6 md:px-6"><form className="rounded-[2rem] border border-[rgba(201,155,71,.35)] bg-white/[.035] p-6 md:p-8"><h2 className="text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[-0.03em]">Send Us a Message</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{["Full Name *","Phone / WhatsApp *","Email Address *","Business Name"].map(x=><input key={x} placeholder={x} className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none"/>)}<select className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold"><option>Service Needed *</option></select><select className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold"><option>Budget Range *</option></select><textarea rows={4} placeholder="Describe your project *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2"/><button className="rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-black md:col-span-2">Send Message →</button></div></form></section>

<section className="mx-auto grid max-w-6xl gap-4 px-5 pb-6 sm:grid-cols-2 md:px-6 xl:grid-cols-4">{contacts.map(([a,b,c])=><article key={a} className="rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">{a}</p><h3 className="mt-3 break-words font-black">{b}</h3><p className="mt-2 text-sm text-[#d6c8ae]">{c}</p></article>)}</section>

<section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 md:px-6 lg:grid-cols-2"><div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-7"><p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Why contact us?</p><h2 className="mt-4 text-[clamp(1.9rem,2.8vw,3rem)] font-black leading-tight tracking-[-0.03em]">We respond fast. We deliver results.</h2><p className="mt-4 text-[#d6c8ae]">Clean planning, premium UI direction and practical execution.</p></div><div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-7"><h2 className="text-[clamp(1.9rem,2.8vw,3rem)] font-black leading-tight tracking-[-0.03em]">Our Response Promise</h2><p className="mt-5 text-[#d6c8ae]">Within 24 hours • Free consultation • No pressure</p></div></section>

<section className="mx-auto max-w-6xl px-5 pb-10 md:px-6"><p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Frequently Asked Questions</p><h2 className="mt-3 text-[clamp(1.9rem,2.8vw,3rem)] font-black leading-tight tracking-[-0.03em]">Got Questions? We&apos;ve Got Answers.</h2><div className="mt-5 grid gap-2">{faqs.map(q=><div key={q} className="flex justify-between rounded-xl border border-white/10 bg-white/[.035] px-5 py-4 font-bold"><span>{q}</span><span className="text-[var(--gold)]">⌄</span></div>)}</div></section>

<section className="mx-auto grid max-w-6xl gap-5 px-5 pb-10 md:px-6 lg:grid-cols-2"><div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6"><h2 className="text-2xl font-black">Our Location</h2><p className="mt-3 text-[#d6c8ae]">Sikar, Rajasthan, India</p><div className="mt-5 h-40 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(201,155,71,.12))]"/></div><div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6"><h2 className="text-2xl font-black">Office Preview</h2>{office.map(x=><p key={x} className="mt-3 rounded-xl border border-white/10 bg-black/20 p-4">{x}</p>)}</div></section>

<footer className="border-t border-white/10 px-5 py-10 md:px-6"><div className="mx-auto grid max-w-6xl gap-8 text-sm text-[#d6c8ae] md:grid-cols-4"><div><b className="text-xl text-white">LuxeForge <span className="text-[var(--gold)]">Studio</span></b><p className="mt-3">Premium websites, apps and software systems.</p></div><div><b>Quick Links</b><p className="mt-3">Home<br/>Services<br/>Pricing<br/>Contact</p></div><div><b>Services</b><p className="mt-3">Website Design<br/>App Development<br/>Custom Software<br/>UI/UX Design</p></div><div><b>Contact</b><p className="mt-3">+91 74148 53321<br/>hello@luxeforgestudio.com</p></div></div><p className="mt-8 text-center text-sm text-[#d6c8ae]">© 2026 LuxeForge Studio. All rights reserved.</p></footer>
<FloatingPreferences/>
</main>
}




