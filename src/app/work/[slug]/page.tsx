import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CaseStudyVisual } from "@/components/case-study-visual";
import { CmsImage } from "@/components/cms/cms-image";
import { PortableContent } from "@/components/cms/portable-content";
import { InnerPageShell } from "@/components/inner-page-shell";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { caseStudies, getCaseStudy, type CaseStudy as LocalCaseStudy } from "@/lib/case-studies";
import { absoluteUrl, createSeoMetadata } from "@/lib/seo";
import { caseStudySchema } from "@/lib/seo/structured-data";
import { fetchSanity, fetchSanityPreview } from "@/sanity/lib/fetch";
import { allCaseStudySlugsQuery, caseStudyBySlugQuery, previewCaseStudyBySlugQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import type { CaseStudy as CmsCaseStudy } from "@/sanity/lib/types";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

export async function generateStaticParams() {
  const cmsSlugs = (await fetchSanity<{ slug: string }[]>(allCaseStudySlugsQuery)) ?? [];
  const slugs = new Set([
    ...caseStudies.map((study) => study.slug),
    ...cmsSlugs.filter((item) => item.slug).map((item) => item.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const localStudy = getCaseStudy(slug);

  if (localStudy) {
    return createSeoMetadata({
      title: `${localStudy.title} | TrustFirst Solutions Case Study`,
      description: localStudy.summary,
      path: `/work/${localStudy.slug}`,
    });
  }

  const study = await fetchSanityPreview<CmsCaseStudy>(caseStudyBySlugQuery, previewCaseStudyBySlugQuery, { slug });

  if (!study) {
    return createSeoMetadata({
      title: "Work",
      description: "TrustFirst Solutions case studies.",
      path: `/work/${slug}`,
    });
  }

  return createSeoMetadata({
    title: study.seoTitle || study.title || "Work",
    description: study.seoDescription || study.summary || "TrustFirst Solutions case study.",
    path: `/work/${slug}`,
    image: absoluteUrl(`/work/${slug}/opengraph-image`),
    imageAlt: study.title,
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const localStudy = getCaseStudy(slug);

  if (localStudy) {
    return <LocalCaseStudyPage study={localStudy} />;
  }

  const study = await fetchSanityPreview<CmsCaseStudy>(caseStudyBySlugQuery, previewCaseStudyBySlugQuery, { slug });
  const settings = await getSiteSettings();

  if (!study) notFound();

  const meta = compactStrings([study.clientName, study.industry, study.serviceType]);
  const metrics = study.metrics?.filter((metric) => metric.value && metric.label) ?? [];
  const gallery = study.gallery?.filter((image) => image.asset?._ref) ?? [];

  return (
    <InnerPageShell eyebrow="Work" title={study.title || "Untitled case study"} description={study.summary || "TrustFirst Solutions case study."}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: study.title || "Case Study", href: `/work/${slug}` },
        ]}
      />
      <JsonLdScript data={caseStudySchema(study, settings, `/work/${slug}`)} />
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

function LocalCaseStudyPage({ study }: { study: LocalCaseStudy }) {
  return (
    <InnerPageShell
      eyebrow={study.category}
      title={study.title}
      description={study.summary}
      ctaHref="/contact"
      ctaLabel="Discuss a Project"
    >
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[#a99b82] transition hover:text-[var(--gold)]">
            <ArrowLeft size={14} /> All work
          </Link>
          <span className="rounded-full border border-[rgba(201,155,71,.25)] bg-[rgba(201,155,71,.04)] px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-[var(--gold)]">
            {study.status}
          </span>
        </div>

        <CaseStudyVisual study={study} />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-white/[.03] p-6">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">The challenge</p>
            <p className="mt-4 text-base leading-8 text-[#d6c8ae]">{study.challenge}</p>
          </article>
          <article className="rounded-[1.6rem] border border-white/10 bg-white/[.03] p-6">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">The system</p>
            <p className="mt-4 text-base leading-8 text-[#d6c8ae]">{study.solution}</p>
          </article>
        </div>

        <section className="mt-12">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">Architecture</p>
          <h2 className="mt-4 max-w-3xl text-[clamp(2.3rem,4vw,4.2rem)] font-black leading-[.96] tracking-[-0.045em]">
            How the product is structured.
          </h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {study.architecture.map((item, index) => (
              <article key={item.title} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5">
                <span className="text-[10px] font-black tracking-[.15em] text-[var(--gold)]">0{index + 1}</span>
                <h3 className="mt-5 text-lg font-black text-[#f8efd9]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#a99b82]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <section>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">Engineering decisions</p>
            <div className="mt-5 grid gap-3">
              {study.engineeringDecisions.map((decision, index) => (
                <div key={decision} className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.2rem] border border-white/10 bg-white/[.025] p-5">
                  <span className="text-xs font-black text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-7 text-[#d6c8ae]">{decision}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">Scope proven in code</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {study.capabilities.map((capability) => (
                <span key={capability} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-bold text-[#cfc0a5]">
                  {capability}
                </span>
              ))}
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">Technology</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <span key={item} className="rounded-full border border-[rgba(201,155,71,.22)] bg-[rgba(201,155,71,.035)] px-3 py-2 text-xs font-black text-[#e7dac1]">
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-12 rounded-[1.7rem] border border-[rgba(201,155,71,.22)] bg-[rgba(201,155,71,.035)] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">Evidence, not invented metrics</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {study.evidence.map((item) => (
              <p key={item} className="rounded-[1rem] border border-white/10 bg-black/20 p-4 text-xs leading-6 text-[#cfc0a5]">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-col gap-5 rounded-[1.7rem] border border-white/10 bg-white/[.03] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--gold)]">Build around your operation</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#f8efd9] md:text-3xl">
              Need a system with similar operational complexity?
            </h2>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-black text-black">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </section>
      </section>
    </InnerPageShell>
  );
}
