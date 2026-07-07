import type { Metadata, Viewport } from "next";
import { createSeoMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const seoDescription =
  "TrustFirst Solutions builds premium websites, business websites, web apps, custom software, dashboards and digital systems for growing businesses.";

export const metadata: Metadata = {
  ...createSeoMetadata({
    title: siteConfig.name,
    description: seoDescription,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "premium websites",
    "business websites",
    "web apps",
    "custom software",
    "admin dashboard",
    "digital systems",
    "TrustFirst Solutions",
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
  },
};

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
      <body>{children}</body>
    </html>
  );
}
