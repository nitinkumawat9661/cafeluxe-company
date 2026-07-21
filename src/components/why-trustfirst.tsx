const TRUST_POINTS = [
  ["Strategy Before Random Marketing", "We first understand your offer, audience, visibility and lead flow before suggesting channels."],
  ["One Connected Growth System", "Ads, content, SEO, website, WhatsApp and follow-up are planned to support the same business goal."],
  ["Transparent Execution", "Work is explained clearly so you know what is being done and why it matters."],
];

const SUPPORT_POINTS = [
  "Clear Communication",
  "Local Market Understanding",
  "No Fake Guarantees",
];

export function WhyTrustFirst() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Why TrustFirst</p>
        <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">Growth work should feel clear, connected and accountable.</h2>
        <p className="mt-3 max-w-2xl text-[#d6c8ae]">TrustFirst focuses on practical strategy, clean execution and honest improvement for businesses that need qualified leads.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {TRUST_POINTS.map(([title, desc]) => (
            <article key={title} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-black text-[#f8efd9]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {SUPPORT_POINTS.map((point) => (
            <span key={point} className="rounded-full border border-[rgba(201,155,71,.24)] bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-[var(--gold)]">
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
