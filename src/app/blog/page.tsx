import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: routePageContent.blog.title,
  description: routePageContent.blog.description,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <InnerPageShell eyebrow="Blog" title="Insights for better digital decisions." description={routePageContent.blog.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Website planning" description="Future posts can help business owners understand structure, content and lead flow." />
        <RouteCard title="Software decisions" description="Articles can explain when a business needs a dashboard, web app or custom system." />
        <RouteCard title="Trust and UX" description="Insights can cover mobile design, credibility, performance and conversion basics." />
      </section>
    </InnerPageShell>
  );
}
