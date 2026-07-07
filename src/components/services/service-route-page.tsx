import { InnerPageShell } from "@/components/inner-page-shell";
import { ServiceDetail } from "@/components/services/service-detail";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { previewServiceBySlugQuery, serviceBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import type { Service } from "@/sanity/lib/types";

type ServiceRoutePageProps = {
  slug: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function imageUrl(image?: Service["ogImage"]) {
  if (!image?.asset?._ref) return undefined;
  return urlForImage(image).width(1200).height(630).fit("crop").auto("format").url();
}

export async function generateServiceMetadata({ slug, fallbackTitle, fallbackDescription }: ServiceRoutePageProps) {
  const service = await fetchSanityPreview<Service>(serviceBySlugQuery, previewServiceBySlugQuery, { slug });

  return createSeoMetadata({
    title: service?.seoTitle || service?.title || fallbackTitle || titleFromSlug(slug),
    description: service?.seoDescription || service?.shortDescription || fallbackDescription || "Service information coming soon.",
    path: `/services/${slug}`,
    image: imageUrl(service?.ogImage || service?.heroImage),
  });
}

export async function ServiceRoutePage({ slug, fallbackTitle, fallbackDescription }: ServiceRoutePageProps) {
  const service = await fetchSanityPreview<Service>(serviceBySlugQuery, previewServiceBySlugQuery, { slug });
  const title = service?.title || fallbackTitle || titleFromSlug(slug);
  const description = service?.shortDescription || fallbackDescription || "Service information coming soon.";

  return (
    <InnerPageShell eyebrow="Service" title={title} description={description}>
      {service ? (
        <ServiceDetail service={service} />
      ) : (
        <section className="mx-auto max-w-4xl px-5 pb-16 md:px-6">
          <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
            <h2 className="text-2xl font-black text-[#f8efd9]">Service information coming soon.</h2>
            <p className="mt-3 text-sm leading-6 text-[#d6c8ae]">
              This service page is ready for CMS content and will update after it is published from TrustFirst Studio.
            </p>
          </article>
        </section>
      )}
    </InnerPageShell>
  );
}
