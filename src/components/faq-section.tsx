const FAQS = [
  [
    "Website kitne din me ready hoti hai?",
    "Simple landing website usually 3 to 7 days me ready ho sakti hai. Business website ya custom design me features ke hisaab se time badh sakta hai."
  ],
  [
    "Payment kaise hota hai?",
    "Project start karne se pehle scope clear hota hai. Uske baad advance payment aur remaining payment delivery stage par decide hoti hai."
  ],
  [
    "Launch ke baad support milega?",
    "Haan, basic handover aur support diya jata hai. Extra maintenance ya changes ke liye separate plan decide kiya ja sakta hai."
  ],
  [
    "Custom software ban sakta hai?",
    "Haan, dashboard, billing, records, reports, user roles, forms aur workflow-based custom software banaya ja sakta hai."
  ],
  [
    "Kya Sikar ke bahar clients ke liye kaam karte ho?",
    "Haan, online discussion, WhatsApp, call aur screen sharing ke through remote clients ke liye bhi kaam ho sakta hai."
  ],
  [
    "Domain aur hosting ka process kya hai?",
    "Domain, hosting, deployment aur basic setup requirement ke according guide kiya ja sakta hai. Final access client ke naam par rakhna best hota hai."
  ]
];

export function FaqSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-6">
      <div className="rounded-[2rem] border border-[rgba(201,155,71,.25)] bg-white/[.035] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[.25em] text-[var(--gold)]">FAQ</p>
        <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-tight tracking-[-0.03em]">
          Common questions before starting a project.
        </h2>
        <p className="mt-3 max-w-2xl text-[#d6c8ae]">
          Basic answers for website, app and custom software clients.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {FAQS.map(([question, answer]) => (
            <article key={question} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-black text-[#f8efd9]">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
