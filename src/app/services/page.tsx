import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

const capabilities = [
  {
    id: "custom-software",
    number: "01",
    title: "Custom Business Software",
    description:
      "Purpose-built systems for businesses whose workflows do not fit generic off-the-shelf tools.",
    points: ["Operational workflows", "Role-based access", "Reporting and controls", "Long-term extensibility"],
  },
  {
    id: "web-applications",
    number: "02",
    title: "Web Applications",
    description:
      "Production web platforms for customers, staff and internal teams with responsive interfaces and reliable backend workflows.",
    points: ["Customer portals", "Internal dashboards", "SaaS-style products", "API integrations"],
  },
  {
    id: "erp-pos",
    number: "03",
    title: "ERP, POS & Billing Systems",
    description:
      "Business-critical systems for billing, inventory, purchases, sales, staff operations and management reporting.",
    points: ["POS and billing", "Inventory", "Purchases and sales", "Operational reports"],
  },
  {
    id: "automation",
    number: "04",
    title: "Business Automation",
    description:
      "Replace repetitive manual work with connected workflows, notifications, approvals and synchronized data.",
    points: ["Workflow automation", "Data synchronization", "Notifications", "Operational safeguards"],
  },
  {
    id: "mobile-apps",
    number: "05",
    title: "Mobile Applications",
    description:
      "Mobile-first applications for staff, operations and customer workflows where a browser alone is not enough.",
    points: ["Android applications", "Offline-aware flows", "Field operations", "Device integrations"],
  },
  {
    id: "ai-integrations",
    number: "06",
    title: "AI Integrations",
    description:
      "Applied AI inside real products and workflows where it reduces manual effort or improves decision support.",
    points: ["AI-assisted workflows", "Document processing", "Internal copilots", "Automation with human control"],
  },
  {
    id: "business-websites",
    number: "07",
    title: "Premium Business Websites",
    description:
      "High-trust websites for companies that need strong positioning, technical quality and a serious digital presence.",
    points: ["Brand positioning", "SEO foundation", "Fast responsive UI", "Lead and contact flows"],
  },
];

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.services.title,
    description: routePageContent.services.description,
    path: "/services",
  });
}

export default function ServicesPage() {
  return (
    <InnerPageShell
      eyebrow="Capabilities"
      title="Software engineering for businesses with real operational complexity."
      description={routePageContent.services.description}
    >
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4">
          {capabilities.map((capability) => (
            <article
              key={capability.id}
              id={capability.id}
              className="scroll-mt-32 rounded-[1.7rem] border border-white/10 bg-white/[.035] p-6 md:grid md:grid-cols-[.18fr_.82fr] md:gap-8 md:p-8"
            >
              <div>
                <span className="text-sm font-black tracking-[.18em] text-[var(--gold)]">{capability.number}</span>
              </div>
              <div>
                <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black leading-tight tracking-[-0.035em] text-[#f8efd9]">
                  {capability.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d6c8ae] md:text-base">{capability.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {capability.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-[rgba(201,155,71,.22)] bg-black/20 px-3 py-2 text-xs font-bold text-[#e7dac1]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-0.5"
          >
            Discuss a software project
          </Link>
        </div>
      </section>
    </InnerPageShell>
  );
}
