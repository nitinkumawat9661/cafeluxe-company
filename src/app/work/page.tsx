import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: routePageContent.work.title,
  description: routePageContent.work.description,
  path: "/work",
});

export default function WorkPage() {
  return (
    <InnerPageShell eyebrow="Work" title="Case studies will live here." description={routePageContent.work.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Project story" description="Future case studies can explain the business context, goal, scope and result." />
        <RouteCard title="Screenshots and media" description="This route is ready for project images, interface previews and delivery notes." />
        <RouteCard title="Outcome focus" description="Each case study should explain what changed for the business without inventing claims." />
      </section>
    </InnerPageShell>
  );
}
