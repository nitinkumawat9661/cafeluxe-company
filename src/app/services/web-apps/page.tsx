import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";

const description = "Secondary capability for browser-based lead capture, follow-up and internal growth workflows.";

export async function generateMetadata() {
  return generateServiceMetadata({ slug: "web-apps", fallbackTitle: "Web Apps for Growth Operations", fallbackDescription: description });
}

export default function WebAppsServicePage() {
  return <ServiceRoutePage slug="web-apps" fallbackTitle="Web Apps for Growth Operations" fallbackDescription={description} />;
}
