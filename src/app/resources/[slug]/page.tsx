import { Download, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/cms/cms-image";
import { ContentCard } from "@/components/cms/content-card";
import { PortableContent } from "@/components/cms/portable-content";
import { InnerPageShell } from "@/components/inner-page-shell";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { absoluteUrl, createSeoMetadata } from "@/lib/seo";
import { resourceSchema } from "@/lib/seo/structured-data";
import { fetchSanity, fetchSanityPreview } from "@/sanity/lib/fetch";
import { allResourceSlugsQuery, previewResourceBySlugQuery, resourceBySlugQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import type { Resource } from "@/sanity/lib/types";

type ResourceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

function resourceBadges(resource: Resource) {
  return compactStrings([
    resource.estimatedReadingTime ? `${resource.estimatedReadingTime} min read` : undefined,
    resource.attachmentUrl ? "Download" : undefined,
    resource.externalResourceUrl ? "External" : undefined,
  ]);
}

export async function generateStaticParams() {
  const slugs = (await fetchSanity<{ slug: string }[]>(allResourceSlugsQuery)) ?? [];
  return slugs.filter((item) => item.slug).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = await fetchSanityPreview<Resource>(resourceBySlugQuery, previewResourceBySlugQuery, { slug });

  if (!resource) {
    return await createSeoMetadata({
      title: "Resources",
      description: "TrustFirst Solutions resources.",
      path: `/resources/${slug}`,
    });
  }

  return await createSeoMetadata({
    title: resource.seoTitle || resource.title || "Resources",
    description: resource.seoDescription || resource.excerpt || "TrustFirst Solutions resource.",
    path: `/resources/${slug}`,
    image: absoluteUrl(`/resources/${slug}/opengraph-image`),
    imageAlt: resource.title,
    type: "article",
  });
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = await fetchSanityPreview<Resource>(resourceBySlugQuery, previewResourceBySlugQuery, { slug });
  const settings = await getSiteSettings();

  if (!resource) notFound();

  const meta = compactStrings([
    resource.category,
    resource.resourceType,
    formatDate(resource.publishedAt),
    resource.author,
    resource.estimatedReadingTime ? `${resource.estimatedReadingTime} min read` : undefined,
  ]);
  const relatedResources = resource.relatedResources ?? [];

  return (
    <InnerPageShell
      eyebrow="Resources"
      title={resource.title || "Untitled resource"}
      description={resource.excerpt || "TrustFirst Solutions resource."}
    >
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: resource.title || "Resource", href: `/resources/${slug}` },
        ]}
      />
      <JsonLdScript data={resourceSchema(resource, settings, `/resources/${slug}`)} />
      <article className="mx-auto max-w-4xl px-5 pb-16 md:px-6">
        {meta.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {meta.map((item) => (
              <span key={item} className="rounded-full border border-[rgba(201,155,71,.24)] px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-[var(--gold)]">
                {item}
              </span>
            ))}
          </div>
        )}

        <CmsImage
          image={resource.featuredImage}
          alt={resource.featuredImage?.alt || resource.title}
          priority
          className="mb-8 aspect-[16/9] w-full rounded-[1.5rem] object-cover"
        />

        {(resource.attachmentUrl || resource.externalResourceUrl) && (
          <div className="mb-8 flex flex-wrap gap-3">
            {resource.attachmentUrl && (
              <a
                href={resource.attachmentUrl}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5"
              >
                <Download size={17} />
                Download {resource.attachmentName || "Resource"}
              </a>
            )}
            {resource.externalResourceUrl && (
              <a
                href={resource.externalResourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,155,71,.35)] px-5 py-3 text-sm font-black text-[var(--gold)] transition hover:-translate-y-0.5"
              >
                <ExternalLink size={17} />
                Open External Resource
              </a>
            )}
          </div>
        )}

        <CmsImage
          image={resource.attachmentPreviewImage}
          alt={resource.attachmentPreviewImage?.alt || `${resource.title || "Resource"} preview`}
          className="mb-8 aspect-[16/9] w-full rounded-[1.5rem] object-cover"
        />

        <PortableContent value={resource.body} fallback="CMS resources coming soon." />
      </article>

      {relatedResources.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
          <h2 className="mb-5 text-3xl font-black text-[#f8efd9]">Related resources</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedResources.map((item) => (
              <ContentCard
                key={item._id}
                href={`/resources/${item.slug?.current}`}
                title={item.title || "Untitled resource"}
                description={item.excerpt || "Open this TrustFirst resource."}
                image={item.featuredImage}
                meta={compactStrings([item.category, item.resourceType, formatDate(item.publishedAt)])}
                badges={resourceBadges(item)}
              />
            ))}
          </div>
        </section>
      )}
    </InnerPageShell>
  );
}
