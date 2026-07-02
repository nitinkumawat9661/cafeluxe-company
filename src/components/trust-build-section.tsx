const trustPoints = [
  ["Clear Scope", "Requirement, pages, features aur timeline pehle clear rakhe jate hain."],
  ["Premium UI", "Design clean, mobile friendly aur serious business look ke according hota hai."],
  ["Fast Handover", "Website/app live hone ke baad basic guidance aur support flow clean milta hai."],
  ["Direct Contact", "Customer ko call, WhatsApp aur form ke through simple enquiry path milta hai."],
];

export function TrustBuildSection() {
  return (
    <section id="trust" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-16 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(201,155,71,.045),rgba(0,0,0,.35))] p-6 shadow-[0_30px_100px_rgba(0,0,0,.42)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--gold)]">Trust Build</p>
            <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.5rem)] font-black leading-tight tracking-[-0.04em]">
              Built to earn trust before the first call.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#d6c8ae]">
              TrustFirst Solutions ka focus sirf website banana nahi hai. Goal ye hai ki client ko first visit par clarity, premium feel aur direct enquiry ka confidence mile.
            </p>
            <a href="#contact" className="mt-7 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5">
              Start a Trusted Project
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustPoints.map(([title, desc], index) => (
              <article key={title} className="rounded-[1.4rem] border border-white/10 bg-black/25 p-5">
                <span className="text-sm font-black text-[var(--gold)]">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-black text-[#f8efd9]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
