import { InnerPageShell } from "@/components/inner-page-shell";
import { ContentCard } from "@/components/cms/content-card";
import { FilterBar } from "@/components/discovery/filter-bar";
import { Pagination } from "@/components/discovery/pagination";
import { RouteCard } from "@/components/route-card";
import {
  blogToDiscoveryItem,
  buildHref,
  getPageNumber,
  getSearchParam,
  paginateItems,
  uniqueOptions,
  type SearchParamsInput,
} from "@/lib/discovery";
import { createSeoMetadata } from "@/lib/seo";
import { routePageContent } from "@/lib/content";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { blogDiscoveryQuery, previewBlogDiscoveryQuery } from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";

type BlogPageProps = {
  searchParams: Promise<SearchParamsInput>;
};

export async function generateMetadata({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  return createSeoMetadata({
    title: routePageContent.blog.title,
    description: routePageContent.blog.description,
    path: buildHref("/blog", params, {}),
  });
}

const fallbackCards = [
  {
    title: "CMS content coming soon",
    description: "Blog posts will appear here after they are published from TrustFirst Studio.",
  },
  {
    title: "Growth planning",
    description: "Future posts can help business owners understand offers, visibility, content and lead flow.",
  },
  {
    title: "Marketing clarity",
    description: "Articles will cover ads, SEO, social media, local visibility, websites and lead generation for business owners.",
  },
];

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = getSearchParam(params, "category");
  const tag = getSearchParam(params, "tag");
  const posts = (await fetchSanityPreview<BlogPost[]>(blogDiscoveryQuery, previewBlogDiscoveryQuery)) ?? [];
  const filtered = posts.filter((post) => {
    const categoryMatch = !category || post.category === category;
    const tagMatch = !tag || post.tags?.includes(tag);
    return categoryMatch && tagMatch;
  });
  const items = filtered.map(blogToDiscoveryItem);
  const pagination = paginateItems(items, getPageNumber(params));

  return (
    <InnerPageShell eyebrow="Blog" title="Insights for better digital decisions." description={routePageContent.blog.description}>
      <FilterBar
        action="/blog"
        filters={[
          { label: "Category", name: "category", value: category, options: uniqueOptions(posts.map((post) => post.category)) },
          { label: "Tag", name: "tag", value: tag, options: uniqueOptions(posts.flatMap((post) => post.tags ?? [])) },
        ]}
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        {pagination.items.length > 0
          ? pagination.items.map((post) => (
              <ContentCard
                key={post.id}
                href={post.href}
                title={post.title}
                description={post.description}
                image={post.image}
                meta={post.meta}
                badges={post.badges}
              />
            ))
          : fallbackCards.map((card) => <RouteCard key={card.title} title={card.title} description={card.description} />)}
      </section>
      <Pagination pathname="/blog" params={params} page={pagination.page} totalPages={pagination.totalPages} />
    </InnerPageShell>
  );
}
