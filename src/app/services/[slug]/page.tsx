import { fetchSanity } from "@/sanity/lib/fetch";
import { allServiceSlugsQuery } from "@/sanity/lib/queries";
import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";
import { growthServiceFallbacks } from "@/lib/service-fallbacks";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = (await fetchSanity<{ slug: string }[]>(allServiceSlugsQuery)) ?? [];
  const fallbackSlugs = growthServiceFallbacks.map((service) => ({ slug: service.slug?.current || "" }));
  const legacyAliasSlugs = new Set(["content-strategy-creation"]);
  const uniqueSlugs = new Set(
    [...slugs.map((item) => item.slug), ...fallbackSlugs.map((item) => item.slug)].filter((slug) => Boolean(slug) && !legacyAliasSlugs.has(slug)),
  );
  return Array.from(uniqueSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  return generateServiceMetadata({ slug });
}

export default async function DynamicServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  return <ServiceRoutePage slug={slug} />;
}
