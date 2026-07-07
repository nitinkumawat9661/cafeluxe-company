import { InnerPageShell } from "@/components/inner-page-shell";
import { ContentCard } from "@/components/cms/content-card";
import { RouteCard } from "@/components/route-card";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";
import { fetchSanity } from "@/sanity/lib/fetch";
import { latestBlogPostsQuery } from "@/sanity/lib/queries";
import type { BlogPost } from "@/sanity/lib/types";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.blog.title,
    description: routePageContent.blog.description,
    path: "/blog",
  });
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

const fallbackCards = [
  {
    title: "CMS content coming soon",
    description: "Blog posts will appear here after they are published from TrustFirst Studio.",
  },
  {
    title: "Website planning",
    description: "Future posts can help business owners understand structure, content and lead flow.",
  },
  {
    title: "Software decisions",
    description: "Articles can explain when a business needs a dashboard, web app or custom system.",
  },
];

export default async function BlogPage() {
  const posts = (await fetchSanity<BlogPost[]>(latestBlogPostsQuery)) ?? [];

  return (
    <InnerPageShell eyebrow="Blog" title="Insights for better digital decisions." description={routePageContent.blog.description}>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-6">
        {posts.length > 0
          ? posts.map((post) => (
              <ContentCard
                key={post._id}
                href={`/blog/${post.slug?.current}`}
                title={post.title || "Untitled post"}
                description={post.excerpt || "Read the latest TrustFirst insight."}
                image={post.featuredImage}
                meta={compactStrings([post.category, formatDate(post.publishedAt)])}
                badges={post.tags?.slice(0, 3)}
              />
            ))
          : fallbackCards.map((card) => <RouteCard key={card.title} title={card.title} description={card.description} />)}
      </section>
    </InnerPageShell>
  );
}
