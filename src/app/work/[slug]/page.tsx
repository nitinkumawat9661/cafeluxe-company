import { notFound } from "next/navigation";
import { CmsImage } from "@/components/cms/cms-image";
import { PortableContent } from "@/components/cms/portable-content";
import { InnerPageShell } from "@/components/inner-page-shell";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanity } from "@/sanity/lib/fetch";
import { allCaseStudySlugsQuery, caseStudyBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import type { CaseStudy } from "@/sanity/lib/types";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function imageUrl(image?: CaseStudy["ogImage"]) {
  if (!image?.asset?._ref) return undefined;
  return urlForImage(image).width(1200).height(630).fit("crop").auto("format").url();
}

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

export async function generateStaticParams() {
  const slugs = (await fetchSanity<{ slug: string }[]>(allCaseStudySlugsQuery)) ?? [];
  return slugs.filter((item) => item.slug).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const study = await fetchSanity<CaseStudy>(caseStudyBySlugQuery, { slug });

  if (!study) {
    return await createSeoMetadata({
      title: "Work",
      description: "TrustFirst Solutions case studies.",
      path: `/work/${slug}`,
    });
  }

  return await createSeoMetadata({
    title: study.seoTitle || study.title || "Work",
    description: study.seoDescription || study.summary || "TrustFirst Solutions case study.",
    path: `/work/${slug}`,
    image: imageUrl(study.ogImage || study.featuredImage),
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const study = await fetchSanity<CaseStudy>(caseStudyBySlugQuery, { slug });

  if (!study) notFound();

  const meta = compactStrings([study.clientName, study.industry, study.serviceType]);
  const metrics = study.metrics?.filter((metric) => metric.value && metric.label) ?? [];
  const gallery = study.gallery?.filter((image) => image.asset?._ref) ?? [];

  return (
    <InnerPageShell eyebrow="Work" title={study.title || "Untitled case study"} description={study.summary || "TrustFirst Solutions case study."}>
      <article className="mx-auto max-w-5xl px-5 pb-16 md:px-6">
        {meta.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {meta.map((item) => (
              <span key={item} className="rounded-full border border-[rgba(201,155,71,.24)] px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-[var(--gold)]">
                {item}
              </span>
            ))}
          </div>
        )}

        <CmsImage image={study.featuredImage} alt={study.featuredImage?.alt || study.title} priority className="mb-8 aspect-[16/9] w-full rounded-[1.5rem] object-cover" />

        {metrics.length > 0 && (
          <section className="mb-10 grid gap-3 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-5">
                <p className="text-2xl font-black text-[var(--gold)]">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#d6c8ae]">{metric.label}</p>
              </div>
            ))}
          </section>
        )}

        <section className="grid gap-10">
          <div>
            <h2 className="text-3xl font-black text-[#f8efd9]">Challenge</h2>
            <PortableContent value={study.challenge} fallback="CMS content coming soon." />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#f8efd9]">Solution</h2>
            <PortableContent value={study.solution} fallback="CMS content coming soon." />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#f8efd9]">Outcome</h2>
            <PortableContent value={study.outcome} fallback="CMS content coming soon." />
          </div>
        </section>

        {study.technologies && study.technologies.length > 0 && (
          <section className="mt-10">
            <h2 className="text-3xl font-black text-[#f8efd9]">Technologies</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {study.technologies.map((technology) => (
                <span key={technology} className="rounded-full bg-white/[.06] px-3 py-2 text-xs font-bold text-[#f8efd9]">
                  {technology}
                </span>
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="mt-10 grid gap-4 md:grid-cols-2">
            {gallery.map((image) => (
              <CmsImage key={image.asset?._ref} image={image} className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />
            ))}
          </section>
        )}

        {study.testimonial && (
          <blockquote className="mt-10 rounded-[1.5rem] border border-[rgba(201,155,71,.3)] bg-black/20 p-6 text-lg font-bold leading-8 text-[#f8efd9]">
            {study.testimonial}
          </blockquote>
        )}
      </article>
    </InnerPageShell>
  );
}
