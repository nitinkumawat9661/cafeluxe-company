import { JsonLd } from "@/components/seo/json-ld";
import { FloatingPreferences } from "@/components/floating-preferences";

const bullets=["Free consultation & tailored solution","No obligation, friendly & transparent","Quick response within 24 hours","Secure & confidential"];

export default function Home(){
  return(
    <main className="min-h-screen overflow-x-hidden bg-[#050504] pb-24 text-[#f7ecd2] md:pb-0">
      <JsonLd />

      <header className="sticky top-0 z-[90000] border-b border-white/10 bg-[#050504]/95">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-xl font-black tracking-tight">LuxeForge <span className="text-[var(--gold)]">Studio</span></div>
          <a href="#contact" className="rounded-full border border-[rgba(201,155,71,.4)] px-5 py-3 text-sm font-black">Start Project</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-8 md:px-6 md:py-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">Get in touch</p>
          <h1 className="mt-5 max-w-[34rem] text-[clamp(2.35rem,4.4vw,4.05rem)] font-black leading-[1.03] tracking-[-.055em]">
            Build a Premium <span className="text-[var(--gold)]">Website, App</span> or <span className="text-[var(--gold)]">Software</span> That Feels Trusted
          </h1>
          <p className="mt-5 max-w-md text-[15px] font-semibold leading-7 text-[#e7dac1] md:text-base md:leading-8">We create refined digital products for serious businesses that need trust, clarity, speed and a polished first impression.</p>
          <div className="mt-7 grid gap-3 text-[#eadcc2]">{bullets.map((b)=><p key={b}>✓ {b}</p>)}</div>
          <div className="mt-8 flex max-w-sm justify-between rounded-2xl border border-[rgba(201,155,71,.3)] bg-white/[.035] p-5">
            <b>Prefer direct consultation?</b><span className="font-black text-[var(--gold)]">+91 74148 53321 →</span>
          </div>
        </div>

        <form id="contact" className="w-full rounded-[1.6rem] border border-[rgba(201,155,71,.35)] bg-[#0b0906]/90 p-5 shadow-2xl md:rounded-[2rem] md:p-8">
          <h2 className="text-2xl font-black leading-tight md:text-3xl">Start Your Project</h2>
          <p className="mt-2 text-sm text-[#d6c8ae]">Tell us what you need. We will review it and respond with the right next step.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["Your Name *","Phone / WhatsApp *","Email Address *","Business / Brand Name"].map((p)=><input key={p} placeholder={p} className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none" />)}
            <select className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold"><option>Service Needed *</option></select>
            <select className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold"><option>Budget Range *</option></select>
            <textarea rows={4} placeholder="Describe your website, app or software requirement *" className="rounded-xl border border-white/10 bg-white/[.055] px-4 py-4 font-bold outline-none md:col-span-2" />
          </div>
          <button className="mt-5 w-full rounded-xl bg-[var(--gold)] px-6 py-4 font-black text-[#090704]">Request Consultation →</button>
        </form>
      </section>

      <section id="proof" className="mx-auto grid max-w-6xl gap-4 px-5 pb-6 sm:grid-cols-2 md:px-6 xl:grid-cols-4">
        {[
          ["Phone / WhatsApp","+91 74148 53321","Mon-Fri: 9:00 AM - 6:00 PM"],
          ["Email Us","hello@luxeforgestudio.com","We reply within 24 hours"],
          ["Our Office","Sikar, Rajasthan","Remote projects across India"],
          ["Business Hours","Mon-Fri: 8:00 AM - 6:00 PM","Saturday by appointment"],
        ].map(([title,value,desc])=>(
          <article key={title} className="rounded-2xl border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5 shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">{title}</p>
            <h3 className="mt-3 break-words text-[15px] font-black leading-snug">{value}</h3>
            <p className="mt-2 break-words text-sm leading-6 text-[#d6c8ae]">{desc}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-stretch gap-5 px-5 pb-10 md:px-6 lg:grid-cols-2">
        <div className="rounded-[1.6rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5 shadow-2xl md:rounded-[2rem] md:p-7">
          <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Why contact us?</p>
          <h2 className="mt-4 text-2xl font-black leading-tight md:text-3xl">We respond fast. We deliver clear results.</h2>
          <p className="mt-4 leading-7 text-[#d6c8ae]">Your project gets a serious review, clean planning, premium UI direction and practical execution.</p>
        </div>

        <div className="rounded-[1.6rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-5 shadow-2xl md:rounded-[2rem] md:p-7">
          <h2 className="text-2xl font-black leading-tight md:text-3xl">Our Response Promise</h2>
          <div className="mt-5 grid gap-4 text-[#d6c8ae]">
            <p><b className="text-[var(--gold)]">Within 24 Hours</b><br />We review your request and reply quickly.</p>
            <p><b className="text-[var(--gold)]">Free Consultation</b><br />We suggest the right solution before pricing.</p>
            <p><b className="text-[var(--gold)]">No Pressure</b><br />Clear advice, transparent pricing and no forced sales.</p>
          </div>
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-6xl px-5 pb-10 md:px-6">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Frequently Asked Questions</p>
        <h2 className="mt-3 text-3xl font-black">Got Questions? We&apos;ve Got Answers.</h2>

        <div className="mt-5 grid gap-2">
          {[
            "How soon will you respond?",
            "How much does a project cost?",
            "Can you sign an NDA?",
            "What if I am not sure about my requirements?",
            "Do you offer ongoing support?",
          ].map((q)=>(
            <div key={q} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.035] px-5 py-4 font-bold">
              <span>{q}</span>
              <span className="text-[var(--gold)]">⌄</span>
            </div>
          ))}
        </div>
      </section>
      <section id="final-cta" className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-[1.6rem] border border-[rgba(201,155,71,.35)] bg-[rgba(201,155,71,.08)] p-6 text-center shadow-2xl md:rounded-[2rem] md:p-8">
          <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Ready to start?</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-tight md:text-4xl">
            Build a premium digital presence that feels serious from the first click.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#d6c8ae]">
            Share your project requirement and we will help you choose the right website, app or software direction.
          </p>
          <a href="#contact" className="mt-6 inline-flex rounded-full bg-[var(--gold)] px-7 py-4 font-black text-[#090704]">
            Request Consultation →
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#d6c8ae] md:flex-row md:items-center md:justify-between">
          <div>
            <b className="text-lg text-[#f7ecd2]">LuxeForge <span className="text-[var(--gold)]">Studio</span></b>
            <p className="mt-1">Premium websites, apps and custom software systems.</p>
          </div>
          <p>© 2026 LuxeForge Studio. All rights reserved.</p>
        </div>
      </footer>
      <FloatingPreferences />
    </main>
  )
}











