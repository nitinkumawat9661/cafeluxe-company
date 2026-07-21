import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const isProduction = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: `${settings.url}/sitemap.xml`,
      host: settings.url,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/studio"],
      },
    ],
    sitemap: `${settings.url}/sitemap.xml`,
    host: settings.url,
  };
}
