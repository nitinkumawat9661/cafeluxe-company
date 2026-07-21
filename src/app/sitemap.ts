import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/lib/routes";
import { fetchSanity } from "@/sanity/lib/fetch";
import { sitemapContentQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import type { SitemapContent } from "@/sanity/lib/types";

function sitemapEntry(
  url: string,
  lastModified: Date,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
) {
  return {
    url,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const content = await fetchSanity<SitemapContent>(sitemapContentQuery);
  const now = new Date();

  const staticRoutes = sitemapRoutes.map((route) =>
    sitemapEntry(
      new URL(route, settings.url).toString(),
      now,
      route === "/" ? 1 : 0.7,
      route === "/" ? "weekly" : "monthly",
    ),
  );

  const blogRoutes =
    content?.blog?.map((item) =>
      sitemapEntry(new URL(`/blog/${item.slug}`, settings.url).toString(), item.lastModified ? new Date(item.lastModified) : now, 0.65, "weekly"),
    ) ?? [];
  const workRoutes =
    content?.work?.map((item) =>
      sitemapEntry(new URL(`/work/${item.slug}`, settings.url).toString(), item.lastModified ? new Date(item.lastModified) : now, 0.65, "monthly"),
    ) ?? [];
  const resourceRoutes =
    content?.resources?.map((item) =>
      sitemapEntry(new URL(`/resources/${item.slug}`, settings.url).toString(), item.lastModified ? new Date(item.lastModified) : now, 0.6, "weekly"),
    ) ?? [];
  const serviceRoutes =
    content?.services?.map((item) =>
      sitemapEntry(new URL(`/services/${item.slug}`, settings.url).toString(), item.lastModified ? new Date(item.lastModified) : now, 0.8, "monthly"),
    ) ?? [];

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes, ...resourceRoutes];
}
