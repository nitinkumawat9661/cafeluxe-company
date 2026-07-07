import { ContentCard } from "@/components/cms/content-card";
import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanity } from "@/sanity/lib/fetch";
import { resourcesListQuery } from "@/sanity/lib/queries";
import type { Resource } from "@/sanity/lib/types";

export const metadata = createSeoMetadata({
  title: routePageContent.resources.title,
  description: routePageContent.resources.description,
  path: "/resources",
});

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

function resourceBadges(resource: Resource) {
  return compactStrings([
    resource.estimatedReadingTime ? `${resource.estimatedReadingTime} min read` : undefined,
    resource.attachmentUrl ? "Download" : undefined,
    resource.externalResourceUrl ? "External" : undefined,
  ]);
}

export default async function ResourcesPage() {
  const resources = (await fetchSanity<Resource[]>(resourcesListQuery)) ?? [];

  return (
    <InnerPageShell eyebrow="Resources" title="Guides and planning resources." description={routePageContent.resources.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ContentCard
              key={resource._id}
              href={`/resources/${resource.slug?.current}`}
              title={resource.title || "Untitled resource"}
              description={resource.excerpt || "Open this TrustFirst resource."}
              image={resource.featuredImage}
              meta={compactStrings([resource.category, resource.resourceType, formatDate(resource.publishedAt)])}
              badges={resourceBadges(resource)}
            />
          ))
        ) : (
          <RouteCard
            title="CMS resources coming soon"
            description="Guides, checklists and planning resources will appear here after they are published from TrustFirst Studio."
          />
        )}
      </section>
    </InnerPageShell>
  );
}
