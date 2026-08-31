import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyVisual({ study }: { study: CaseStudy }) {
  if (study.slug === "trustfirst-pos") {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070706] p-5 md:p-7">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative grid gap-4 lg:grid-cols-[.8fr_1.2fr_.8fr] lg:items-center">
          <DevicePanel label="Windows desktop" items={["Billing", "Stock", "KDS", "Printing"]} />
          <div className="rounded-[1.5rem] border border-[rgba(201,155,71,.3)] bg-[rgba(201,155,71,.05)] p-5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">Local-first core</p>
            <h3 className="mt-3 text-2xl font-black text-[#f8efd9]">SQLite execution store</h3>
            <div className="mx-auto mt-5 grid max-w-sm gap-2 text-left">
              {["Durable outbox", "Pull cursor", "Conflict checks"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs font-bold text-[#cfc0a5]">{item}</div>
              ))}
            </div>
            <div className="my-5 h-px bg-[linear-gradient(90deg,transparent,rgba(201,155,71,.5),transparent)]" />
            <p className="text-xs font-black uppercase tracking-[.15em] text-[var(--gold)]">TrustFirst Cloud Gateway</p>
            <p className="mt-2 text-xs leading-6 text-[#988b75]">projection · change feed · idempotency</p>
          </div>
          <DevicePanel label="Android / browser" items={["POS", "Dashboard", "Sync", "Remote access"]} />
        </div>
      </div>
    );
  }

  if (study.slug === "cafeluxe-pos-suite") {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#070706] p-5 md:p-7">
        <div className="grid gap-4 lg:grid-cols-[.72fr_1.1fr_.82fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">Guest</p>
            <div className="mt-4 rounded-[1.2rem] border border-[rgba(201,155,71,.22)] bg-[rgba(201,155,71,.04)] p-4">
              <div className="mx-auto h-12 w-12 rounded-lg border border-[rgba(201,155,71,.45)] [background-image:linear-gradient(45deg,#c89b45_25%,transparent_25%),linear-gradient(-45deg,#c89b45_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#c89b45_75%),linear-gradient(-45deg,transparent_75%,#c89b45_75%)] [background-position:0_0,0_6px,6px_-6px,-6px_0px] [background-size:12px_12px]" />
              <p className="mt-4 text-center text-sm font-black text-[#f8efd9]">Table QR</p>
              <p className="mt-1 text-center text-xs text-[#8e816c]">Menu → order</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[rgba(201,155,71,.25)] bg-[rgba(201,155,71,.035)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">Restaurant operations</p>
              <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Live Menu", "Orders", "KOT", "Payments", "Tables", "Records"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/28 p-3">
                  <span className="block h-1.5 w-8 rounded-full bg-[rgba(201,155,71,.45)]" />
                  <p className="mt-4 text-xs font-black text-[#d9ccb4]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">Staff Android</p>
            <div className="mx-auto mt-4 max-w-[13rem] rounded-[1.5rem] border border-[rgba(201,155,71,.24)] bg-[#0b0a08] p-3 shadow-[0_24px_70px_rgba(0,0,0,.5)]">
              <div className="mx-auto h-1 w-10 rounded-full bg-white/10" />
              <div className="mt-4 grid gap-2">
                {["New order", "Kitchen", "Billing", "Payment"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[.025] px-3 py-2 text-[11px] font-bold text-[#cfc0a5]">
                    {item}<span className="text-[var(--gold)]">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#070706] p-5 md:p-7">
      <div className="grid gap-3 lg:grid-cols-5 lg:items-center">
        {["Lead", "Approval", "Quotation", "Invoice", "Delivery"].map((item, index) => (
          <div key={item} className="relative">
            <div className="rounded-[1.25rem] border border-white/10 bg-black/30 p-4">
              <span className="text-[10px] font-black text-[var(--gold)]">0{index + 1}</span>
              <p className="mt-7 text-sm font-black text-[#f8efd9]">{item}</p>
              <p className="mt-1 text-[11px] leading-5 text-[#837764]">{index === 1 ? "role-aware state" : "tenant workflow node"}</p>
            </div>
            {index < 4 && <span className="absolute -right-3 top-1/2 hidden h-px w-3 bg-[rgba(201,155,71,.45)] lg:block" />}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {["Admin / client separation", "Shared workspace packages", "Deployment safeguards"].map((item) => (
          <div key={item} className="rounded-xl border border-[rgba(201,155,71,.18)] bg-[rgba(201,155,71,.035)] px-4 py-3 text-xs font-bold text-[#cfc0a5]">{item}</div>
        ))}
      </div>
    </div>
  );
}

function DevicePanel({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
      <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">{label}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[.025] px-3 py-2 text-xs font-bold text-[#cfc0a5]">{item}</div>
        ))}
      </div>
    </div>
  );
}
