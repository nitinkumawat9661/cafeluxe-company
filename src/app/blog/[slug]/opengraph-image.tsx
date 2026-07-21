import { createTrustFirstOgImage, ogImageSize } from "@/lib/seo/og-image";
import { fetchSanity } from "@/sanity/lib/fetch";
import { blogPostBySlugQuery } from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";

export const size = ogImageSize;
export const contentType = "image/png";
export const alt = "TrustFirst Solutions blog post";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const post = await fetchSanity<BlogPost>(blogPostBySlugQuery, { slug });

  return createTrustFirstOgImage({
    title: post?.title || "TrustFirst Blog",
    eyebrow: post?.category || "Blog",
  });
}
