import { ContentCard } from "@/components/cms/content-card";
import { FilterBar } from "@/components/discovery/filter-bar";
import { Pagination } from "@/components/discovery/pagination";
import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import {
  buildHref,
  getPageNumber,
  getSearchParam,
  paginateItems,
  resourceToDiscoveryItem,
  uniqueOptions,
  type SearchParamsInput,
} from "@/lib/discovery";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { previewResourcesListQuery, resourcesListQuery } from "@/sanity/lib/queries";
import type { Resource } from "@/sanity/lib/types";

type ResourcesPageProps = {
  searchParams: Promise<SearchParamsInput>;
};

export async function generateMetadata({ searchParams }: ResourcesPageProps) {
  const params = await searchParams;
  return createSeoMetadata({
    title: routePageContent.resources.title,
    description: routePageContent.resources.description,
    path: buildHref("/resources", params, {}),
  });
}
export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = await searchParams;
  const category = getSearchParam(params, "category");
  const resourceType = getSearchParam(params, "resourceType");
  const resources = (await fetchSanityPreview<Resource[]>(resourcesListQuery, previewResourcesListQuery)) ?? [];
  const filtered = resources.filter((resource) => {
    const categoryMatch = !category || resource.category === category;
    const typeMatch = !resourceType || resource.resourceType === resourceType;
    return categoryMatch && typeMatch;
  });
  const pagination = paginateItems(filtered.map(resourceToDiscoveryItem), getPageNumber(params));

  return (
    <InnerPageShell eyebrow="Resources" title="Guides and planning resources." description={routePageContent.resources.description}>
      <FilterBar
        action="/resources"
        filters={[
          { label: "Category", name: "category", value: category, options: uniqueOptions(resources.map((resource) => resource.category)) },
          { label: "Resource Type", name: "resourceType", value: resourceType, options: uniqueOptions(resources.map((resource) => resource.resourceType)) },
        ]}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        {pagination.items.length > 0 ? (
          pagination.items.map((resource) => (
            <ContentCard
              key={resource.id}
              href={resource.href}
              title={resource.title}
              description={resource.description}
              image={resource.image}
              meta={resource.meta}
              badges={resource.badges}
            />
          ))
        ) : (
          <RouteCard
            title="CMS resources coming soon"
            description="Guides, checklists and planning resources will appear here after they are published from TrustFirst Studio."
          />
        )}
      </section>
      <Pagination pathname="/resources" params={params} page={pagination.page} totalPages={pagination.totalPages} />
    </InnerPageShell>
  );
}
