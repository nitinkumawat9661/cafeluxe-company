import type { Metadata } from "next";
import { EmptyState } from "@/components/discovery/empty-state";
import { SearchBar } from "@/components/discovery/search-bar";
import { SearchResults } from "@/components/discovery/search-results";
import { InnerPageShell } from "@/components/inner-page-shell";
import {
  blogToDiscoveryItem,
  getDiscoveryData,
  getSearchParam,
  matchesQuery,
  resourceToDiscoveryItem,
  serviceToDiscoveryItem,
  workToDiscoveryItem,
  type SearchParamsInput,
} from "@/lib/discovery";

type SearchPageProps = {
  searchParams: Promise<SearchParamsInput>;
};

export const metadata: Metadata = {
  title: "Search",
  description: "Search TrustFirst Solutions content.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSearchParam(params, "q");
  const data = await getDiscoveryData();
  const allItems = [
    ...data.blog.map(blogToDiscoveryItem),
    ...data.work.map(workToDiscoveryItem),
    ...data.resources.map(resourceToDiscoveryItem),
    ...data.services.map(serviceToDiscoveryItem),
  ];
  const results = query ? allItems.filter((item) => matchesQuery(item, query)) : [];

  return (
    <InnerPageShell eyebrow="Search" title="Find TrustFirst content." description="Search services, insights, case studies and planning resources.">
      <SearchBar defaultQuery={query} />
      {query ? (
        results.length > 0 ? (
          <SearchResults results={results} />
        ) : (
          <section className="mx-auto max-w-3xl px-5 pb-16 md:px-6">
            <EmptyState title="No results found" description="Try a different keyword or browse the content sections directly." />
          </section>
        )
      ) : (
        <section className="mx-auto max-w-3xl px-5 pb-16 md:px-6">
          <EmptyState title="Search content" description="Enter a keyword to search published blog posts, case studies, resources and services." />
        </section>
      )}
    </InnerPageShell>
  );
}
