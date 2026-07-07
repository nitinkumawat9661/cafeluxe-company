import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";

const description =
  "Custom software planning and development for business-specific workflows, internal systems and digital operations.";

export async function generateMetadata() {
  return generateServiceMetadata({ slug: "custom-software", fallbackTitle: "Custom Software Development", fallbackDescription: description });
}

export default function CustomSoftwareServicePage() {
  return <ServiceRoutePage slug="custom-software" fallbackTitle="Custom Software Development" fallbackDescription={description} />;
}
