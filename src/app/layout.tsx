import type { Metadata, Viewport } from "next";
import { PreviewBanner } from "@/components/preview/preview-banner";
import { createSeoMetadata } from "@/lib/seo";
import { localSearchKeywords } from "@/lib/seo/local-search";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.defaultSeoTitle || "Digital Marketing Agency in Sikar | TrustFirst Solutions";
  const description =
    settings.defaultSeoDescription ||
    "TrustFirst Solutions is a digital marketing agency in Sikar helping businesses with SEO, Google Ads, Meta Ads, social media, websites, Google Business Profile, lead generation and automation.";

  return {
    ...(await createSeoMetadata({
      title,
      description,
      path: "/",
    })),
    metadataBase: new URL(settings.url),
    applicationName: settings.name,
    category: "business",
    classification: "Digital marketing, local SEO, advertising and website development",
    keywords: [...localSearchKeywords, settings.name],
    creator: settings.name,
    publisher: settings.name,
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080706",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <PreviewBanner />
        {children}
      </body>
    </html>
  );
}
