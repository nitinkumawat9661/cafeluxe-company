const PRICING = [
  ["Landing Website","Starting ₹4,999","Single page website for small businesses, portfolios and service pages."],
  ["Business Website","Starting ₹9,999","Multi-section business website with contact form, service details and location."],
  ["Custom Software","Custom Quote","Dashboard, records, reports, roles, billing, workflow or internal business system."],
  ["Mobile App","Custom Quote","Android app, staff app, customer app or business utility app based on requirement."]
];

export function PricingSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Starting Budget</p>
        <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Clear starting points for different business needs.</h2>
        <p className="mt-3 max-w-2xl text-[#d6c8ae]">Final pricing depends on pages, features, design depth, forms, dashboard logic and support requirement.</p>

        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {PRICING.map(([title, price, desc]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">{title}</p>
              <h3 className="mt-4 text-2xl font-black text-[#f8efd9]">{price}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">{desc}</p>
              <a href="#contact" className="mt-5 inline-flex text-sm font-black text-[var(--gold)]">Discuss Project →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

