import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";

const description =
  "Premium business websites for companies that need clear positioning, trust-building design and direct enquiry paths that support ads, SEO and lead generation.";

export async function generateMetadata() {
  return generateServiceMetadata({ slug: "websites", fallbackTitle: "Website Design and Development", fallbackDescription: description });
}

export default function WebsitesServicePage() {
  return <ServiceRoutePage slug="websites" fallbackTitle="Website Design and Development" fallbackDescription={description} />;
}
