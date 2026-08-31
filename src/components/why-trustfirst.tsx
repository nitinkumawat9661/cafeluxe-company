const TRUST_POINTS = [
  [
    "Business-first engineering",
    "We start with the workflow, users, constraints and failure points before deciding what software should be built.",
  ],
  [
    "Full-system ownership",
    "Frontend, backend, data, deployment and operational workflows are treated as one product instead of disconnected deliverables.",
  ],
  [
    "Clear, accountable delivery",
    "Scope, trade-offs and progress stay visible. We prefer verifiable working software over inflated promises.",
  ],
];

const SUPPORT_POINTS = [
  "Production-minded",
  "Mobile-first",
  "Data-safe changes",
  "Long-term maintainability",
];

export function WhyTrustFirst() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">Why TrustFirst</p>
        <h2 className="mt-4 max-w-4xl text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">
          Serious business software needs more than a polished interface.
        </h2>
        <p className="mt-3 max-w-2xl text-[#d6c8ae]">
          We design around reliability, operational fit and maintainability so the product still makes sense after launch day.
        </p>

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
            <span
              key={point}
              className="rounded-full border border-[rgba(201,155,71,.24)] bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-[var(--gold)]"
            >
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
