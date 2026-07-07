const faqs = [
  {
    question: "How long does a website or software project take?",
    answer:
      "Simple business website generally 5-10 days me ready ho sakti hai. Custom software, dashboard ya app ka timeline requirement ke according decide hota hai.",
  },
  {
    question: "Do you make mobile friendly websites?",
    answer:
      "Yes. Website desktop, tablet aur phone tino ke liye responsive banayi jati hai.",
  },
  {
    question: "Can customers contact directly from the website?",
    answer:
      "Yes. Website me WhatsApp, call button aur enquiry form add kiya ja sakta hai.",
  },
  {
    question: "Do you provide support after delivery?",
    answer:
      "Yes. Delivery ke baad basic support, small corrections aur guidance provide ki jati hai.",
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
          Clear answers before we start.
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
