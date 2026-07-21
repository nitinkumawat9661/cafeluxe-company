import { notFound } from "next/navigation";
import { CmsImage } from "@/components/cms/cms-image";
import { PortableContent } from "@/components/cms/portable-content";
import { InnerPageShell } from "@/components/inner-page-shell";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { absoluteUrl, createSeoMetadata } from "@/lib/seo";
import { blogArticleSchema } from "@/lib/seo/structured-data";
import { fetchSanity, fetchSanityPreview } from "@/sanity/lib/fetch";
import { allBlogSlugsQuery, blogPostBySlugQuery, previewBlogPostBySlugQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import type { BlogPost } from "@/sanity/lib/types";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

export async function generateStaticParams() {
  const slugs = (await fetchSanity<{ slug: string }[]>(allBlogSlugsQuery)) ?? [];
  return slugs.filter((item) => item.slug).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await fetchSanityPreview<BlogPost>(blogPostBySlugQuery, previewBlogPostBySlugQuery, { slug });

  if (!post) {
    return await createSeoMetadata({
      title: "Blog",
      description: "TrustFirst Solutions blog.",
      path: `/blog/${slug}`,
    });
  }

  return await createSeoMetadata({
    title: post.seoTitle || post.title || "Blog",
    description: post.seoDescription || post.excerpt || "TrustFirst Solutions blog.",
    path: `/blog/${slug}`,
    image: absoluteUrl(`/blog/${slug}/opengraph-image`),
    imageAlt: post.title,
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await fetchSanityPreview<BlogPost>(blogPostBySlugQuery, previewBlogPostBySlugQuery, { slug });
  const settings = await getSiteSettings();

  if (!post) notFound();

  const meta = compactStrings([post.category, formatDate(post.publishedAt), post.author]);

  return (
    <InnerPageShell eyebrow="Blog" title={post.title || "Untitled post"} description={post.excerpt || "TrustFirst Solutions insight."}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title || "Post", href: `/blog/${slug}` },
        ]}
      />
      <JsonLdScript data={blogArticleSchema(post, settings, `/blog/${slug}`)} />
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

        <CmsImage image={post.featuredImage} alt={post.featuredImage?.alt || post.title} priority className="mb-8 aspect-[16/9] w-full rounded-[1.5rem] object-cover" />

        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/[.06] px-3 py-2 text-xs font-bold text-[#f8efd9]">
                {tag}
              </span>
            ))}
          </div>
        )}

        <PortableContent value={post.body} fallback="CMS content coming soon." />
      </article>
    </InnerPageShell>
  );
}
