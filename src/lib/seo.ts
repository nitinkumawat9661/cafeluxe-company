import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createSeoMetadata({ title, description, path = "/", image }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const pageTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const images = image ? [{ url: image }] : undefined;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}
