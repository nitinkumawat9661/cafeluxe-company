import { InnerPageShell } from "@/components/inner-page-shell";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { ServiceDetail } from "@/components/services/service-detail";
import { getGrowthServiceFallback } from "@/lib/service-fallbacks";
import { absoluteUrl, createSeoMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/seo/structured-data";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { previewServiceBySlugQuery, serviceBySlugQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
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

async function getServiceForSlug(slug: string) {
  const service = await fetchSanityPreview<Service>(serviceBySlugQuery, previewServiceBySlugQuery, { slug });
  if (service) return service;

  if (slug === "content-strategy") {
    return fetchSanityPreview<Service>(serviceBySlugQuery, previewServiceBySlugQuery, { slug: "content-strategy-creation" });
  }

  return null;
}

export async function generateServiceMetadata({ slug, fallbackTitle, fallbackDescription }: ServiceRoutePageProps) {
  const service = (await getServiceForSlug(slug)) ?? getGrowthServiceFallback(slug);

  return createSeoMetadata({
    title: service?.seoTitle || service?.title || fallbackTitle || titleFromSlug(slug),
    description: service?.seoDescription || service?.shortDescription || fallbackDescription || "Service information coming soon.",
    path: `/services/${slug}`,
    image: absoluteUrl(`/services/${slug}/opengraph-image`),
    imageAlt: service?.title || fallbackTitle || titleFromSlug(slug),
  });
}

export async function ServiceRoutePage({ slug, fallbackTitle, fallbackDescription }: ServiceRoutePageProps) {
  const service = (await getServiceForSlug(slug)) ?? getGrowthServiceFallback(slug);
  const settings = await getSiteSettings();
  const title = service?.title || fallbackTitle || titleFromSlug(slug);
  const description = service?.shortDescription || fallbackDescription || "Service information coming soon.";

  return (
    <InnerPageShell eyebrow="Service" title={title} description={description}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: title, href: `/services/${slug}` },
        ]}
      />
      {service && <JsonLdScript data={serviceSchema(service, settings, `/services/${slug}`)} />}
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
