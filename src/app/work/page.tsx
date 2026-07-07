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
  uniqueOptions,
  workToDiscoveryItem,
  type SearchParamsInput,
} from "@/lib/discovery";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { caseStudyDiscoveryQuery, previewCaseStudyDiscoveryQuery } from "@/sanity/lib/queries";
import type { CaseStudy } from "@/sanity/lib/types";

type WorkPageProps = {
  searchParams: Promise<SearchParamsInput>;
};

export async function generateMetadata({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  return createSeoMetadata({
    title: routePageContent.work.title,
    description: routePageContent.work.description,
    path: buildHref("/work", params, {}),
  });
}

const fallbackCards = [
  {
    title: "CMS content coming soon",
    description: "Case studies will appear here after real project stories are published from TrustFirst Studio.",
  },
  {
    title: "Project story",
    description: "Future case studies can explain the business context, goal, scope and result.",
  },
  {
    title: "Outcome focus",
    description: "Each case study should explain what changed for the business without inventing claims.",
  },
];

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const industry = getSearchParam(params, "industry");
  const serviceType = getSearchParam(params, "serviceType");
  const caseStudies = (await fetchSanityPreview<CaseStudy[]>(caseStudyDiscoveryQuery, previewCaseStudyDiscoveryQuery)) ?? [];
  const filtered = caseStudies.filter((study) => {
    const industryMatch = !industry || study.industry === industry;
    const serviceMatch = !serviceType || study.serviceType === serviceType;
    return industryMatch && serviceMatch;
  });
  const pagination = paginateItems(filtered.map(workToDiscoveryItem), getPageNumber(params));

  return (
    <InnerPageShell eyebrow="Work" title="Case studies will live here." description={routePageContent.work.description}>
      <FilterBar
        action="/work"
        filters={[
          { label: "Industry", name: "industry", value: industry, options: uniqueOptions(caseStudies.map((study) => study.industry)) },
          { label: "Service Type", name: "serviceType", value: serviceType, options: uniqueOptions(caseStudies.map((study) => study.serviceType)) },
        ]}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        {pagination.items.length > 0
          ? pagination.items.map((study) => (
              <ContentCard
                key={study.id}
                href={study.href}
                title={study.title}
                description={study.description}
                image={study.image}
                meta={study.meta}
                badges={study.badges}
              />
            ))
          : fallbackCards.map((card) => <RouteCard key={card.title} title={card.title} description={card.description} />)}
      </section>
      <Pagination pathname="/work" params={params} page={pagination.page} totalPages={pagination.totalPages} />
    </InnerPageShell>
  );
}
