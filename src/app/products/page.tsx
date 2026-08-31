import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

const products = [
  {
    label: "Restaurant operations",
    title: "CafeLuxe POS Suite",
    slug: "cafeluxe-pos-suite",
    description:
      "A connected restaurant system covering billing, QR ordering, staff workflows, stock and day-to-day operational control.",
    capabilities: ["POS & billing", "QR ordering", "Staff workflows", "Inventory"],
  },
  {
    label: "Business commerce",
    title: "TrustFirst POS",
    slug: "trustfirst-pos",
    description:
      "A modern POS and business operations platform designed around reliable billing, local data and extensible synchronization.",
    capabilities: ["Billing", "Products & stock", "Offline-first workflows", "Online sync"],
  },
  {
    label: "Business operations",
    title: "ERP & Client Platforms",
    slug: "business-erp-client-platform",
    description:
      "Custom operational systems for businesses that need billing, inventory, accounting-adjacent workflows, staff access and client-facing tools.",
    capabilities: ["ERP workflows", "Role-based access", "Reports", "Client portals"],
  },
];

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.products.title,
    description: routePageContent.products.description,
    path: "/products",
  });
}

export default function ProductsPage() {
  return (
    <InnerPageShell
      eyebrow="Products"
      title="We do not only design software. We operate and evolve real systems."
      description={routePageContent.products.description}
    >
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {products.map((product, index) => (
            <Link href={`/work/${product.slug}`} key={product.title} className="group flex min-h-[24rem] flex-col rounded-[1.7rem] border border-white/10 bg-white/[.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(201,155,71,.32)]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">{product.label}</span>
                <span className="text-sm font-black text-[#7f735f]">0{index + 1}</span>
              </div>
              <h2 className="mt-8 text-3xl font-black tracking-[-0.04em] text-[#f8efd9]">{product.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#d6c8ae]">{product.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.capabilities.map((capability) => (
                  <span key={capability} className="rounded-full border border-white/10 px-3 py-2 text-xs text-[#e7dac1]">
                    {capability}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-8 text-xs font-black uppercase tracking-[.14em] text-[var(--gold)]">
                <span>View case study</span>
                <span className="transition group-hover:translate-x-1">↗</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-[1.7rem] border border-[rgba(201,155,71,.28)] bg-black/20 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">Need something specific?</p>
            <h2 className="mt-3 text-2xl font-black text-[#f8efd9] md:text-3xl">We also build systems from scratch around your workflow.</h2>
          </div>
          <Link href="/contact" className="mt-5 inline-flex shrink-0 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black md:mt-0">
            Start a project
          </Link>
        </div>
      </section>
    </InnerPageShell>
  );
}
