import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/contact-form";
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

                  <section id="process" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Build process</p>
        <h2 className="mt-5 section-title">
          A clear path from <span className="gold-word">idea</span> to launch.
        </h2>

        <div className="premium-process-track mt-14">
          <article className="process-step process-left rounded-[2rem] p-6">
            <span className="step-node">01</span>
            <h3>Plan the offer</h3>
            <p>We lock the goal, pages, audience and conversion direction before design starts.</p>
          </article>

          <article className="process-step process-right rounded-[2rem] p-6">
            <span className="step-node">02</span>
            <h3>Shape the visual system</h3>
            <p>Typography, spacing, sections and premium mood are planned around your brand.</p>
          </article>

          <article className="process-step process-left rounded-[2rem] p-6">
            <span className="step-node">03</span>
            <h3>Build the experience</h3>
            <p>The approved UI becomes responsive, fast and clean production-ready code.</p>
          </article>

          <article className="process-step process-right rounded-[2rem] p-6">
            <span className="step-node">04</span>
            <h3>Polish and launch</h3>
            <p>Forms, links, SEO basics, performance and final handover checks are completed.</p>
          </article>
        </div>
      </section>
      <section id="reviews" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Client proof</p>
        <h2 className="mt-5 section-title">Built to feel <span className="gold-word">credible</span> before the first call.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {reviews.map((r)=><article key={r.name} className="lux-card rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.28em] text-[var(--gold)]">5/5 rating</p><p className="mt-5 text-xl font-semibold leading-8">{r.text}</p><p className="mt-6 font-black">{r.name}</p><p className="text-sm text-[#cfc0a5]">{r.business}</p></article>)}
        </div>
      </section>

      <section id="alignment" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Design alignment</p>
        <h2 className="mt-5 section-title">
          Clean layouts work because every element has a <span className="gold-word">purpose</span>.
        </h2>

        <div className="alignment-shell mt-12 grid gap-5 md:grid-cols-2">
          {[
            ["Grid discipline","Every section follows a clear structure, so the interface feels organised instead of random."],
            ["Visual balance","Text, cards, space and actions are placed with proper weight, not just decoration."],
            ["Spacing rhythm","Consistent gaps make the website easier to scan and more premium to experience."],
            ["Component consistency","Buttons, cards, forms and sections follow one visual system across the website."],
          ].map(([title,text])=>(
            <article key={title} className="alignment-card rounded-[2rem] p-6">
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Pricing direction</p>
        <h2 className="mt-5 section-title">
          Clear packages for <span className="gold-word">serious</span> business builds.
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <article className="pricing-card rounded-[2rem] p-6">
            <p className="pricing-tag">Starter</p>
            <h3>Website Launch</h3>
            <strong>Starts from Rs. 7,999</strong>
            <ul>
              <li>Premium landing page</li>
              <li>Mobile responsive design</li>
              <li>Basic SEO setup</li>
              <li>Contact / WhatsApp inquiry</li>
            </ul>
            <a href="#contact" className="pricing-action">Discuss this package</a>
          </article>

          <article className="pricing-card pricing-card-featured rounded-[2rem] p-6">
            <p className="pricing-tag">Most chosen</p>
            <h3>Business Website</h3>
            <strong>Starts from Rs. 14,999</strong>
            <ul>
              <li>Multi-section premium website</li>
              <li>Portfolio / services structure</li>
              <li>Lead-focused contact form</li>
              <li>Deployment support</li>
            </ul>
            <a href="#contact" className="pricing-action">Discuss this package</a>
          </article>

          <article className="pricing-card rounded-[2rem] p-6">
            <p className="pricing-tag">Custom</p>
            <h3>Software / POS</h3>
            <strong>Custom quote</strong>
            <ul>
              <li>Restaurant POS / QR ordering</li>
              <li>Admin dashboard</li>
              <li>Custom workflow logic</li>
              <li>Support and scaling plan</li>
            </ul>
            <a href="#contact" className="pricing-action">Discuss this package</a>
          </article>
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-6xl px-6 py-24">
        <p className="section-kicker">Common questions</p>
        <h2 className="mt-5 section-title">
          Clear answers before you <span className="gold-word">start</span>.
        </h2>

        <div className="faq-grid mt-12 grid gap-5 md:grid-cols-2">
          {[
            ["How long does a website take?","A focused business website usually takes 5 to 12 days depending on pages, content and approval speed."],
            ["How does payment work?","We usually start with an advance, then continue with milestone-based payment for larger projects."],
            ["Will the website work on mobile?","Yes. Every website is built responsive so it works properly on mobile, tablet and desktop."],
            ["Will my idea stay private?","Yes. Your idea, workflow and business details are treated as confidential and are not disclosed."],
            ["Do you help with domain and hosting?","Yes. We can help with domain, hosting, deployment and basic technical setup."],
            ["Do you build custom software too?","Yes. We build business websites, admin dashboards, restaurant POS, QR ordering and custom software."],
          ].map(([q,a])=>(
            <article key={q} className="faq-card rounded-[2rem] p-6">
              <h3>{q}</h3>
              <p>{a}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactForm />

                  <footer id="footer" className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="premium-footer rounded-[2.4rem] p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <p className="text-sm font-black tracking-[.34em] text-[var(--cream)]">LUXEFORGE STUDIO</p>
              <p className="mt-5 max-w-md leading-7 text-[#d6c8ae]">
                Premium websites, restaurant systems, admin dashboards and digital product experiences built for serious businesses.
              </p>
            </div>

            <div>
              <p className="text-sm font-black text-[var(--gold)]">Studio</p>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-[#d6c8ae]">
                <a href="#services">Services</a>
                <a href="#showcase">Selected work</a>
                <a href="#products">Products</a>
              </div>
            </div>

            <div>
              <p className="text-sm font-black text-[var(--gold)]">Contact</p>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-[#d6c8ae]">
                <a href="#contact">Start project</a>
                <a href="#reviews">Client proof</a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-sm font-medium text-[#9f927c]">
            &copy; 2026 LuxeForge Studio. Built for premium digital presence.
          </div>
        </div>
      </footer>
    </main>
  );
}





























