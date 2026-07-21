const faqs = [
  {
    question: "What services does TrustFirst Solutions provide?",
    answer:
      "We help with Meta Ads, Google Ads, social media management, content strategy, SEO, Google Business Profile, websites, landing pages, lead generation systems, automation and growth consultation.",
  },
  {
    question: "Do you work with small and local businesses?",
    answer:
      "Yes. We work with local shops, service businesses and growing brands in Sikar, Jaipur, Rajasthan and other parts of India.",
  },
  {
    question: "How much does digital marketing cost?",
    answer:
      "Cost depends on the services, campaign scope, content needs and ad spend. The free audit helps identify the right starting point before budget is discussed deeply.",
  },
  {
    question: "How soon can results appear?",
    answer:
      "Some improvements can be visible quickly, especially in tracking, content clarity or enquiry flow. Ads, SEO and brand trust usually need consistent testing and optimization.",
  },
  {
    question: "Do you guarantee leads?",
    answer:
      "No. We do not give fake guarantees. We build and improve the system around visibility, offer, landing experience, follow-up and data so lead quality can improve over time.",
  },
  {
    question: "Do you manage ad spend?",
    answer:
      "We can guide or manage campaigns, but ad spend remains separate from service fees and should be planned according to the business goal and market.",
  },
  {
    question: "Can you handle website and ads together?",
    answer:
      "Yes. That is often stronger because ad traffic needs a clear landing page, trust signals, lead capture and follow-up path.",
  },
  {
    question: "What is included in the free growth audit?",
    answer:
      "We review your social presence, Google visibility, ads opportunity, website or landing page gaps, and lead follow-up basics using the details you share.",
  },
  {
    question: "Do you work outside Sikar or Rajasthan?",
    answer:
      "Yes. TrustFirst is based in Sikar and serves businesses across Jaipur, Rajasthan and India through remote-first communication.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl scroll-mt-32 px-5 py-16 md:px-6">
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--gold)]">
          Got Questions?
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-black leading-tight tracking-[-0.04em]">
          Clear answers before the audit.
        </h2>
      </div>

      <div className="mt-10 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-[1.4rem] border border-white/10 bg-white/[.035] p-5 backdrop-blur-xl open:border-[rgba(201,155,71,.35)] open:bg-[rgba(201,155,71,.06)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-black text-[#f8efd9]">
              <span>{faq.question}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[var(--gold)] transition group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-[#d6c8ae]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
