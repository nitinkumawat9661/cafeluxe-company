import type { Metadata, Viewport } from "next";
import { PreviewBanner } from "@/components/preview/preview-banner";
import { createSeoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    ...(await createSeoMetadata({
      title: settings.defaultSeoTitle || settings.name,
      description: settings.defaultSeoDescription || settings.description,
      path: "/",
    })),
    metadataBase: new URL(settings.url),
    keywords: [
      "premium websites",
      "business websites",
      "web apps",
      "custom software",
      "admin dashboard",
      "digital systems",
      settings.name,
    ],
    creator: settings.name,
    publisher: settings.name,
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    robots: {
      index: true,
      follow: true,
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
