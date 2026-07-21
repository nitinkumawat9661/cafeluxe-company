import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";

const description = "Secondary capability for custom workflows that support lead management, follow-up and business operations.";

export async function generateMetadata() {
  return generateServiceMetadata({ slug: "custom-software", fallbackTitle: "Custom Growth Systems", fallbackDescription: description });
}

export default function CustomSoftwareServicePage() {
  return <ServiceRoutePage slug="custom-software" fallbackTitle="Custom Growth Systems" fallbackDescription={description} />;
}
