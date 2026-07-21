import { InnerPageShell } from "@/components/inner-page-shell";
import { ServiceCard } from "@/components/services/service-card";
import { routePageContent } from "@/lib/content";
import { buildHref, type SearchParamsInput } from "@/lib/discovery";
import { growthServiceFallbacks } from "@/lib/service-fallbacks";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { previewServiceListQuery, serviceListQuery } from "@/sanity/lib/queries";
import type { Service } from "@/sanity/lib/types";

type ServicesPageProps = {
  searchParams: Promise<SearchParamsInput>;
};

const categoryOrder = ["Acquire", "Build Trust", "Convert", "Scale"];
const categoryDescriptions: Record<string, string> = {
  Acquire: "Bring the right attention and enquiries into the business.",
  "Build Trust": "Make your business look active, credible and easy to find.",
  Convert: "Turn visits and clicks into calls, WhatsApp messages and form leads.",
  Scale: "Improve follow-up, reporting and growth decisions over time.",
};

export async function generateMetadata({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  return createSeoMetadata({
    title: routePageContent.services.title,
    description: routePageContent.services.description,
    path: buildHref("/services", params, {}),
  });
}

export default async function ServicesPage() {
  const cmsServices = (await fetchSanityPreview<Service[]>(serviceListQuery, previewServiceListQuery)) ?? [];
  const cmsSlugs = new Set(cmsServices.map((service) => service.slug?.current).filter(Boolean));
  const legacySlugs = new Set(["web-apps", "custom-software"]);
  const services = [
    ...cmsServices.filter((service) => !legacySlugs.has(service.slug?.current || "")),
    ...growthServiceFallbacks.filter((service) => !cmsSlugs.has(service.slug?.current)),
  ].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));

  return (
    <InnerPageShell eyebrow="Services" title={routePageContent.services.title} description={routePageContent.services.description}>
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-10">
          {categoryOrder.map((category) => {
            const group = services.filter((service) => service.serviceCategory === category);
            if (group.length === 0) return null;

            return (
              <div key={category} className="grid gap-5">
                <div className="grid gap-3 border-b border-[rgba(201,155,71,.22)] pb-4 md:grid-cols-[.35fr_1fr] md:items-end">
                  <h2 className="text-3xl font-black text-[var(--gold)]">{category}</h2>
                  <p className="max-w-2xl text-sm leading-6 text-[#d6c8ae]">{categoryDescriptions[category]}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.map((service) => <ServiceCard key={service._id} service={service} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </InnerPageShell>
  );
}
