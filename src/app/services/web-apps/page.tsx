import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";

const description =
  "Web apps and dashboards for teams that need browser-based tools, clearer workflows and practical business operations.";

export async function generateMetadata() {
  return generateServiceMetadata({ slug: "web-apps", fallbackTitle: "Web App Development", fallbackDescription: description });
}

export default function WebAppsServicePage() {
  return <ServiceRoutePage slug="web-apps" fallbackTitle="Web App Development" fallbackDescription={description} />;
}
