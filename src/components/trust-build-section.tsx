import Link from "next/link";

const trustPoints = [
  ["Clear Offer", "Business message, services and next step should be easy to understand."],
  ["Visible Proof Path", "Content, search presence and profile signals should help customers trust faster."],
  ["Direct Contact", "Call, WhatsApp and form paths should make enquiry simple on mobile."],
  ["Follow-up Clarity", "Every lead needs a response flow so warm enquiries are not wasted."],
];

export function TrustBuildSection() {
  return (
    <section id="trust" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-16 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(201,155,71,.045),rgba(0,0,0,.35))] p-6 shadow-[0_30px_100px_rgba(0,0,0,.42)] backdrop-blur-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.32em] text-[var(--gold)]">Trust Build</p>
            <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.5rem)] font-black leading-tight tracking-[-0.04em]">
              Trust comes before the customer fills the form.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#d6c8ae]">
              TrustFirst Solutions focuses on the visible details that make a customer feel confident enough to call, message or submit an enquiry.
            </p>
            <Link href="/#audit" className="mt-7 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5">
              Get Free Growth Audit
            </Link>
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
