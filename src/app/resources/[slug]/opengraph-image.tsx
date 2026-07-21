import { createTrustFirstOgImage, ogImageSize } from "@/lib/seo/og-image";
import { fetchSanity } from "@/sanity/lib/fetch";
import { resourceBySlugQuery } from "@/sanity/lib/queries";
import type { Resource } from "@/sanity/lib/types";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "TrustFirst Solutions resource";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const resource = await fetchSanity<Resource>(resourceBySlugQuery, { slug });

  return createTrustFirstOgImage({
    title: resource?.title || "TrustFirst Resource",
    eyebrow: resource?.resourceType || resource?.category || "Resource",
  });
}
