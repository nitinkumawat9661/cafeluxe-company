import { createTrustFirstOgImage, ogImageSize } from "@/lib/seo/og-image";
import { getGrowthServiceFallback } from "@/lib/service-fallbacks";
import { fetchSanity } from "@/sanity/lib/fetch";
import { serviceBySlugQuery } from "@/sanity/lib/queries";
import type { Service } from "@/sanity/lib/types";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "TrustFirst Solutions service";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const service =
    (await fetchSanity<Service>(serviceBySlugQuery, { slug })) ??
    (slug === "content-strategy" ? await fetchSanity<Service>(serviceBySlugQuery, { slug: "content-strategy-creation" }) : null) ??
    getGrowthServiceFallback(slug);

  return createTrustFirstOgImage({
    title: service?.title || "TrustFirst Service",
    eyebrow: service?.serviceCategory || "Service",
  });
}
