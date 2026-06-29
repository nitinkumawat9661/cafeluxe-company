const pricingPlans = [
  {
    badge: "BASIC",
    shape: "seal",
    title: "Basic Plan",
    price: "₹7,800",
    features: [
      "1 Free Domain Name",
      "10 Page Dynamic Website",
      "Business Email id (Webmail)",
      "Unlimited Images & Videos",
      "Unlimited Bandwidth / Space",
      "100% Responsive Website",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "Social Media Integration",
      "24/7 Support (SLA: 48 Hours)",
      "Annual Renewal ₹3000",
    ],
  },
  {
    badge: "CLASSIC",
    shape: "shield",
    title: "Classic Plan",
    price: "₹8,800",
    features: [
      "1 Free Domain Name",
      "UL 15 Pages Dynamic Website",
      "Business Email id (Webmail)",
      "Unlimited Images & Videos",
      "Unlimited Bandwidth / Space",
      "100% Responsive Website",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "Social Media Integration",
      "WhatsApp Integration",
      "SSL Certificate",
      "24/7 Support (SLA: 24 Hours)",
      "Annual Renewal ₹4000",
    ],
    highlighted: true,
  },
  {
    badge: "PREMIUM",
    shape: "seal",
    title: "Premium Plan",
    price: "₹14,300",
    features: [
      "1 Free Domain Name",
      "UL 20 Pages Dynamic Website",
      "Unlimited Email id (Webmail / Outlook)",
      "Android Application",
      "Unlimited Images & Videos",
      "Unlimited Bandwidth / Space",
      "100% Responsive Website",
      "Live Chat Integration",
      "Payment Gateway Integration",
      "Social Media Integration",
      "WhatsApp Integration",
      "SSL Certificate",
      "cPanel Access",
      "24/7 Support (SLA: 12 Hours)",
      "Annual Renewal ₹5000",
    ],
  },
];

function PlanBadge({
  label,
  shape,
}: {
  label: string;
  shape: string;
}) {
  return (
    <div className="relative mx-auto mb-7 grid h-44 w-44 place-items-center">
      <div
        className={
          shape === "shield"
            ? "absolute inset-2 rotate-45 rounded-[2rem] border-[7px] border-[#f8efd9]/90 bg-[#1f3447] shadow-[0_0_45px_rgba(201,155,71,.2)]"
            : "absolute inset-0 rounded-full border-[7px] border-[#f8efd9]/90 bg-[#1f3447] shadow-[0_0_45px_rgba(201,155,71,.2)]"
        }
      />
      <div className="absolute left-[-18px] right-[-18px] top-1/2 h-12 -translate-y-1/2 bg-[linear-gradient(90deg,#f5a400,#f4c400,#d99a00)] shadow-[0_12px_30px_rgba(0,0,0,.35)]" />
      <div className="absolute left-[-32px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[18px] border-r-[30px] border-y-transparent border-r-[#d99000]" />
      <div className="absolute right-[-32px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[18px] border-l-[30px] border-y-transparent border-l-[#d99000]" />
      <span className="relative z-10 text-lg font-black uppercase tracking-[.45em] text-black">
        {label}
      </span>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-6">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs font-black uppercase tracking-[.35em] text-[var(--gold)]">
          Pricing
        </p>
        <h2 className="mt-4 text-[clamp(2rem,3.5vw,4rem)] font-black leading-tight tracking-[-0.04em]">
          Website plans built for serious businesses.
        </h2>
        <p className="mt-4 text-base leading-8 text-[#d6c8ae]">
          Choose a plan based on pages, integrations and support level. Every plan is designed for responsive, premium and business-ready delivery.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <article
            key={plan.title}
            className={[
              "relative overflow-hidden rounded-[2rem] border p-6 md:p-8",
              "bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(201,155,71,.04),rgba(0,0,0,.25))]",
              "shadow-[0_30px_110px_rgba(0,0,0,.45)] backdrop-blur-xl",
              plan.highlighted
                ? "border-[rgba(201,155,71,.55)] lg:-translate-y-4"
                : "border-[rgba(201,155,71,.22)]",
            ].join(" ")}
          >
            {plan.highlighted && (
              <div className="absolute right-5 top-5 rounded-full border border-[rgba(201,155,71,.45)] bg-[rgba(201,155,71,.12)] px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">
                Popular
              </div>
            )}

            <PlanBadge label={plan.badge} shape={plan.shape} />

            <h3 className="text-2xl font-black tracking-[-0.02em] text-[#f8efd9]">
              {plan.title} – <span className="text-[var(--gold)]">{plan.price}</span>
            </h3>

            <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#d6c8ae]">
              {plan.features.map((feature) => {
                const strong =
                  feature.includes("Page") ||
                  feature.includes("Unlimited Email") ||
                  feature.includes("Android") ||
                  feature.includes("WhatsApp") ||
                  feature.includes("SSL") ||
                  feature.includes("Payment Gateway") ||
                  feature.includes("Live Chat");

                return (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[2px] text-[var(--gold)]">–</span>
                    <span className={strong ? "font-black text-[#f8efd9]" : ""}>
                      {feature}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-7 text-sm font-bold text-[#9aa8bb]">
              Note: GST @ 18% Applicable on All Purchase
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5"
              >
                Get Quote Now
              </a>
              <a
                href="https://wa.me/917414853321?text=Hi%20TrustFirst%20Solutions%2C%20I%20want%20pricing%20details."
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-full border border-[rgba(201,155,71,.35)] px-5 py-3 text-sm font-black text-[var(--gold)] transition hover:bg-[rgba(201,155,71,.1)]"
              >
                WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

