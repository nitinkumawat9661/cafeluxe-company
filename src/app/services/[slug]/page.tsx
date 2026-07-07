import { fetchSanity } from "@/sanity/lib/fetch";
import { allServiceSlugsQuery } from "@/sanity/lib/queries";
import { generateServiceMetadata, ServiceRoutePage } from "@/components/services/service-route-page";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = (await fetchSanity<{ slug: string }[]>(allServiceSlugsQuery)) ?? [];
  return slugs.filter((item) => item.slug).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  return generateServiceMetadata({ slug });
}

export default async function DynamicServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  return <ServiceRoutePage slug={slug} />;
}
