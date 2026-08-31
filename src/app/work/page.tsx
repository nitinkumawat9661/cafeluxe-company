import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

const work = [
  {
    title: "CafeLuxe POS Suite",
    description:
      "Restaurant operations software connecting billing, QR ordering, stock and staff workflows in one product family.",
    points: ["Restaurant POS", "QR Ordering", "Inventory", "Staff Operations"],
  },
  {
    title: "TrustFirst POS",
    description:
      "A business POS platform designed around reliable billing, durable local data, inventory workflows and universal online synchronization.",
    points: ["Billing", "Inventory", "Offline-first", "Online Sync"],
  },
  {
    title: "Business ERP & Client Platforms",
    description:
      "Custom operational systems for businesses that need controlled billing, stock, staff access, reports and client-facing workflows.",
    points: ["ERP Workflows", "Role Access", "Reports", "Client Portal"],
  },
];

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.work.title,
    description: routePageContent.work.description,
    path: "/work",
  });
}

export default function WorkPage() {
  return (
    <InnerPageShell
      eyebrow="Work"
      title="Software systems built for real operations."
      description={routePageContent.work.description}
    >
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {work.map((item) => (
            <RouteCard
              key={item.title}
              title={item.title}
              description={item.description}
              points={item.points}
            />
          ))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[.03] p-6">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">Case studies in progress</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#d6c8ae]">
            Detailed case studies will document the business problem, system scope, engineering decisions and verified outcomes without inventing metrics or claims.
          </p>
        </div>
      </section>
    </InnerPageShell>
  );
}
