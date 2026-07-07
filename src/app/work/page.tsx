import { ContentCard } from "@/components/cms/content-card";
import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanity } from "@/sanity/lib/fetch";
import { latestCaseStudiesQuery } from "@/sanity/lib/queries";
import type { CaseStudy } from "@/sanity/lib/types";

export const metadata = createSeoMetadata({
  title: routePageContent.work.title,
  description: routePageContent.work.description,
  path: "/work",
});

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

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

export default async function WorkPage() {
  const caseStudies = (await fetchSanity<CaseStudy[]>(latestCaseStudiesQuery)) ?? [];

  return (
    <InnerPageShell eyebrow="Work" title="Case studies will live here." description={routePageContent.work.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        {caseStudies.length > 0
          ? caseStudies.map((study) => {
              const metrics = study.metrics
                ?.filter((metric) => metric.value && metric.label)
                .map((metric) => `${metric.value} ${metric.label}`);

              return (
                <ContentCard
                  key={study._id}
                  href={`/work/${study.slug?.current}`}
                  title={study.title || "Untitled case study"}
                  description={study.summary || "Read the TrustFirst project story."}
                  image={study.featuredImage}
                  meta={compactStrings([study.clientName, study.industry, study.serviceType])}
                  badges={metrics}
                />
              );
            })
          : fallbackCards.map((card) => <RouteCard key={card.title} title={card.title} description={card.description} />)}
      </section>
    </InnerPageShell>
  );
}
