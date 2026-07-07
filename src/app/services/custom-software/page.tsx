import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { createSeoMetadata } from "@/lib/seo";

const description =
  "Custom software planning and development for business-specific workflows, internal systems and digital operations.";

export async function generateMetadata() {
  return createSeoMetadata({
    title: "Custom Software Development",
    description,
    path: "/services/custom-software",
  });
}

export default function CustomSoftwareServicePage() {
  return (
    <InnerPageShell eyebrow="Service" title="Custom software shaped around real operations." description={description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Workflow clarity" description="Map the current process first, then build screens and systems around what the team actually needs." />
        <RouteCard title="Admin control" description="Create structured tools for managing records, requests, reports and operational data." />
        <RouteCard title="Maintainable build" description="Use a modern stack and clear structure so the system can evolve after launch." />
      </section>
    </InnerPageShell>
  );
}
