import { FilterBar } from "@/components/discovery/filter-bar";
import { Pagination } from "@/components/discovery/pagination";
import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { ServiceCard } from "@/components/services/service-card";
import { routePageContent } from "@/lib/content";
import { buildHref, getPageNumber, getSearchParam, paginateList, uniqueOptions, type SearchParamsInput } from "@/lib/discovery";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { previewServiceListQuery, serviceListQuery } from "@/sanity/lib/queries";
import type { Service } from "@/sanity/lib/types";

type ServicesPageProps = {
  searchParams: Promise<SearchParamsInput>;
};

export async function generateMetadata({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  return createSeoMetadata({
    title: routePageContent.services.title,
    description: routePageContent.services.description,
    path: buildHref("/services", params, {}),
  });
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  const category = getSearchParam(params, "category");
  const services = (await fetchSanityPreview<Service[]>(serviceListQuery, previewServiceListQuery)) ?? [];
  const filtered = services.filter((service) => !category || service.serviceCategory === category);
  const pagination = paginateList(filtered, getPageNumber(params));

  return (
    <InnerPageShell eyebrow="Services" title={routePageContent.services.title} description={routePageContent.services.description}>
      <FilterBar
        action="/services"
        filters={[
          { label: "Category", name: "category", value: category, options: uniqueOptions(services.map((service) => service.serviceCategory)) },
        ]}
      />
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {pagination.items.length > 0 ? (
            pagination.items.map((service) => <ServiceCard key={service._id} service={service} />)
          ) : (
            <RouteCard title="Service information coming soon." description="Service details will appear here after they are published from TrustFirst Studio." />
          )}
        </div>
      </section>
      <Pagination pathname="/services" params={params} page={pagination.page} totalPages={pagination.totalPages} />
    </InnerPageShell>
  );
}
