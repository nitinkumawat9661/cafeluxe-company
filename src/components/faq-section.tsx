import { homepageFaqs } from "@/lib/seo/local-search";

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl scroll-mt-32 px-5 py-16 md:px-6">
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--gold)]">
          Digital Marketing Questions
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-black leading-tight tracking-[-0.04em]">
          Clear answers for businesses in Sikar and beyond.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#d6c8ae]">
          Direct answers about SEO, websites, Google Maps, paid ads, lead generation and realistic growth timelines.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {homepageFaqs.map((faq) => (
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
