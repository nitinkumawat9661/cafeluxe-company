import { InnerPageShell } from "@/components/inner-page-shell";
import { RouteCard } from "@/components/route-card";
import { createSeoMetadata } from "@/lib/seo";

const description =
  "Web apps and dashboards for teams that need browser-based tools, clearer workflows and practical business operations.";

export async function generateMetadata() {
  return createSeoMetadata({
    title: "Web App Development",
    description,
    path: "/services/web-apps",
  });
}

export default function WebAppsServicePage() {
  return (
    <InnerPageShell eyebrow="Service" title="Web apps for practical business workflows." description={description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        <RouteCard title="Dashboards" description="Interfaces for viewing, updating and understanding business data in one focused place." />
        <RouteCard title="Portals" description="Customer, staff or admin portals designed around repeat use and fast scanning." />
        <RouteCard title="Responsive workflows" description="Layouts and interactions that work across desktop and mobile without losing clarity." />
      </section>
    </InnerPageShell>
  );
}
