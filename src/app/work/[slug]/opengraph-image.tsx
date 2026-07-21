import { createTrustFirstOgImage, ogImageSize } from "@/lib/seo/og-image";
import { fetchSanity } from "@/sanity/lib/fetch";
import { caseStudyBySlugQuery } from "@/sanity/lib/queries";
import type { CaseStudy } from "@/sanity/lib/types";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "TrustFirst Solutions case study";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const study = await fetchSanity<CaseStudy>(caseStudyBySlugQuery, { slug });

  return createTrustFirstOgImage({
    title: study?.title || "TrustFirst Case Study",
    eyebrow: study?.serviceType || study?.industry || "Case Study",
  });
}
