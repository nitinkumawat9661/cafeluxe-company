import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/sanity/lib/site-settings";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/", baseUrl = siteConfig.url) {
  return new URL(path, baseUrl).toString();
}

export async function createSeoMetadata({ title, description, path = "/", image, imageAlt, type = "website" }: SeoInput): Promise<Metadata> {
  const settings = await getSiteSettings();
  const draft = await draftMode();
  const url = absoluteUrl(path, settings.url);
  const resolvedTitle = title || settings.defaultSeoTitle || siteConfig.name;
  const resolvedDescription = description || settings.defaultSeoDescription || siteConfig.description;
  const pageTitle =
    resolvedTitle === settings.name || resolvedTitle === settings.defaultSeoTitle
      ? resolvedTitle
      : `${resolvedTitle} | ${settings.name}`;
  const resolvedImage = image || settings.defaultOgImageUrl;
  const images = resolvedImage ? [{ url: resolvedImage, alt: imageAlt || pageTitle }] : undefined;

  return {
    title: pageTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: resolvedDescription,
      url,
      siteName: settings.name,
      type,
      locale: "en_IN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: resolvedDescription,
      images: resolvedImage ? [resolvedImage] : undefined,
      site: settings.name,
    },
    robots: draft.isEnabled
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}
