import { absoluteUrl } from "@/lib/seo";
import { fetchSanity } from "@/sanity/lib/fetch";
import { rssBlogPostsQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import type { BlogPost } from "@/sanity/lib/types";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const settings = await getSiteSettings();
  const posts = (await fetchSanity<BlogPost[]>(rssBlogPostsQuery)) ?? [];

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug?.current}`, settings.url);
      const publicationDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString();

      return `
        <item>
          <title>${escapeXml(post.title || "Untitled post")}</title>
          <description>${escapeXml(post.excerpt || "")}</description>
          <link>${escapeXml(link)}</link>
          <guid>${escapeXml(link)}</guid>
          <pubDate>${escapeXml(publicationDate)}</pubDate>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(settings.name)}</title>
    <description>${escapeXml(settings.description)}</description>
    <link>${escapeXml(settings.url)}</link>
    <language>en-IN</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
