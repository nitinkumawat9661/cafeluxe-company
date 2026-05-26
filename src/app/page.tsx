import { JsonLd } from "@/components/seo/json-ld";
import { navLinks, products, services } from "@/lib/site";

const reviews = [
  { name: "Restaurant Owner", business: "Premium Cafe", text: "The website feels polished, clear and serious. It does not look like a template." },
  { name: "Food Business Owner", business: "Food Business", text: "The product presentation and inquiry flow make the brand feel more trusted." },
  { name: "Cloud Kitchen Founder", business: "Restaurant Tech Client", text: "CafeLuxe ecosystem is presented like a real business product, not just software." },
];

export default function Home() {
  return (
    <main className="min-h-screen text-[var(--ink)]">
      <JsonLd />

      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-[rgba(244,229,195,.18)] bg-[#0b0805]/80 px-6 py-3 backdrop-blur-2xl">
          <a href="#studio" className="text-sm font-black tracking-[0.34em] text-[var(--cream)]">LUXEFORGE STUDIO</a>
          <div className="hidden gap-7 md:flex">
            {navLinks.map((n) => <a key={n.href} href={n.href} className="text-sm font-semibold text-[#cfc0a5] hover:text-[var(--cream)]">{n.label}</a>)}
          </div>
          <a href="#contact" className="rounded-full bg-[var(--cream)] px-5 py-2 text-sm font-black !text-[#0b0704]">Start project</a>
        </nav>
      </header>

      <section id="studio" className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-12 px-6 pt-32 lg:grid-cols-[1.04fr_.96fr]">
        <div>
          <p className="section-kicker">Luxury digital studio</p>
          <h1 className="editorial-title mt-5">Build a <span className="gold-word">premium</span> brand presence that feels real.</h1>
          <p className="mt-7 max-w-2xl text-xl font-medium leading-9 text-[#e8dcc5]">We craft high-end business websites, CafeLuxe restaurant systems, admin panels and digital products that feel expensive, clean and trustworthy.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#services" className="rounded-full bg-[var(--cream)] px-7 py-3 font-black !text-[#0b0704]">Explore services</a>
            <a href="#products" className="premium-pill rounded-full px-7 py-3 font-bold">View products</a>
          </div>
        </div>

        <div className="lux-card rounded-[2.3rem] p-5">
          <div className="cream-panel rounded-[1.8rem] p-6 md:p-7">
            <p className="text-[11px] font-black uppercase tracking-[.26em] text-black/70">Studio signature</p>
            <h2 className="mt-4 max-w-[410px] text-[2.15rem] font-black leading-[0.98] tracking-[-0.045em] md:text-[2.65rem]">Premium design.<br />Clear message.<br />Better trust.</h2>
            <p className="mt-5 max-w-[420px] text-sm font-semibold leading-6 text-black/60">A refined first impression for businesses that want to look serious, polished and expensive.</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {["Premium websites","CafeLuxe suite","Admin dashboards","VPS-ready builds"].map((x)=><div key={x} className="glass-chip rounded-2xl p-5 font-bold">{x}</div>)}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">What we craft</p>
        <h2 className="mt-5 section-title">Digital work with <span className="gold-word">taste</span>, not templates.</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s,i)=><article key={s} className="lux-card rounded-[2rem] p-6"><p className="text-sm font-black text-[var(--gold)]">0{i+1}</p><h3 className="mt-8 text-2xl font-black tracking-[-.03em]">{s}</h3><p className="mt-4 leading-7 text-[#d6c8ae]">Strategy, interface, performance and conversion structure built for real businesses.</p></article>)}
        </div>
      </section>
      <section id="showcase" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Selected work</p>
        <h2 className="mt-5 section-title">
          Product experiences built with <span className="gold-word">business</span> clarity.
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <article className="work-card rounded-[2rem] p-6">
            <p className="text-sm font-black text-[var(--gold)]">01</p>
            <h3 className="mt-7 text-3xl font-black tracking-[-.04em]">CafeLuxe POS</h3>
            <p className="mt-4 leading-7 text-[#d6c8ae]">Billing, KOT, reports, records and printer-ready restaurant operations.</p>
          </article>

          <article className="work-card rounded-[2rem] p-6">
            <p className="text-sm font-black text-[var(--gold)]">02</p>
            <h3 className="mt-7 text-3xl font-black tracking-[-.04em]">QR Ordering Flow</h3>
            <p className="mt-4 leading-7 text-[#d6c8ae]">Table ordering, menu browsing, cart, offers and counter workflow.</p>
          </article>

          <article className="work-card rounded-[2rem] p-6">
            <p className="text-sm font-black text-[var(--gold)]">03</p>
            <h3 className="mt-7 text-3xl font-black tracking-[-.04em]">Admin Systems</h3>
            <p className="mt-4 leading-7 text-[#d6c8ae]">Dashboards, lead handling, content controls and business management tools.</p>
          </article>
        </div>
      </section>
<section id="products" className="mx-auto max-w-6xl px-6 py-24">
        <div className="product-shell rounded-[2.4rem] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-kicker">CafeLuxe ecosystem</p>
              <h2 className="mt-4 section-title max-w-[620px]">
                Restaurant systems with <span className="gold-word">premium</span> control.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-[#e8dcc5]">
              POS, QR ordering, KOT, reports and staff workflows designed like a serious product suite.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {products.map((p, i) => (
              <article key={p.slug} className="product-card rounded-[2rem] p-6">
                <p className="text-sm font-black text-[var(--gold)]">0{i + 1}</p>
                <h3 className="mt-6 text-[2rem] font-black leading-tight tracking-[-.04em]">{p.name}</h3>
                <p className="mt-4 leading-7 text-[#d6c8ae]">{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Client proof</p>
        <h2 className="mt-5 section-title">Built to feel <span className="gold-word">credible</span> before the first call.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {reviews.map((r)=><article key={r.name} className="lux-card rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">5/5 rating</p><p className="mt-5 text-xl font-semibold leading-8">{r.text}</p><p className="mt-6 font-black">{r.name}</p><p className="text-sm text-[#cfc0a5]">{r.business}</p></article>)}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="cream-panel rounded-[2.5rem] p-10">
          <p className="text-xs font-black uppercase tracking-[.32em] text-[#7b5a1b]">Start your build</p>
          <h2 className="mt-5 section-title">Tell us what you want to launch.</h2>
        </div>
      </section>
    </main>
  );
}








