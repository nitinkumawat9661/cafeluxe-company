import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: routePageContent.resources.title,
  description: routePageContent.resources.description,
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <InnerPageShell eyebrow="Resources" title="Guides and planning resources." description={routePageContent.resources.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Website checklist" description="A future planning guide for pages, content, enquiry paths and SEO basics." />
        <RouteCard title="Software scope guide" description="A future resource for turning business workflows into clear software requirements." />
        <RouteCard title="Launch readiness" description="A future checklist for testing, contact flows, speed, mobile layout and handover." />
      </section>
    </InnerPageShell>
  );
}
