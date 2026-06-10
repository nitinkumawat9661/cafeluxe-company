const TRUST_POINTS = [
  ["Transparent Communication","Clear discussion before work starts, so there is no confusion later."],
  ["Practical Development","We build useful pages, dashboards, forms and flows, not random decoration."],
  ["Premium UI Direction","Design stays clean, readable and business-focused across devices."],
  ["Direct Support","You get simple contact and handover support after delivery."],
  ["Secure Handling","Project details, lead data and access credentials are treated carefully."],
  ["No Fake Promises","We explain what is possible, what is not, and what needs more time or budget."]
];

export function WhyTrustFirst() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Why TrustFirst</p>
        <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Built with clarity, trust and practical business thinking.</h2>
        <p className="mt-3 max-w-2xl text-[#d6c8ae]">We focus on clean communication, useful systems and delivery that makes sense for real businesses.</p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {TRUST_POINTS.map(([title, desc]) => (
            <article key={title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-black text-[#f8efd9]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
