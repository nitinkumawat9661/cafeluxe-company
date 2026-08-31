import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { BrandIntro } from "@/components/brand/BrandIntro";
import { OfflineMonitor } from "@/components/brand/OfflineMonitor";
import { ServiceWorkerRegistration } from "@/components/brand/ServiceWorkerRegistration";
import { PreviewBanner } from "@/components/preview/preview-banner";
import { createSeoMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const premiumTypographyCss = `
  body,
  button,
  input,
  textarea,
  select,
  nav,
  label,
  summary {
    font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  }

  .hero-copy h1,
  .editorial-title,
  .section-title,
  .services-journey-heading h2,
  .growth-gaps-copy h2,
  .growth-system-heading h2,
  .process-editorial > h2,
  #audit h2,
  #work h2,
  #feedback h2,
  .trust-river-surface section:first-of-type h1,
  .gold-word {
    font-family: var(--font-display), Georgia, "Times New Roman", serif !important;
    font-weight: 600 !important;
    letter-spacing: -0.035em;
    font-kerning: normal;
  }

  .gold-word {
    font-style: italic;
  }

  .hero-copy p,
  .hero-copy a,
  .section-kicker,
  .service-text-link,
  .growth-audit-form,
  .growth-audit-form h3,
  .growth-audit-form summary,
  nav a,
  button {
    font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif !important;
  }

  @media (max-width: 767px) {
    .hero-copy h1,
    .services-journey-heading h2,
    .growth-gaps-copy h2,
    .growth-system-heading h2,
    .process-editorial > h2,
    .trust-river-surface section:first-of-type h1 {
      letter-spacing: -0.025em;
      line-height: 0.98;
    }
  }
`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = "TrustFirst Solutions | Software Engineering Company";
  const description =
    "TrustFirst Solutions builds custom business software, web applications, ERP and POS systems, mobile apps, automation and AI integrations for businesses across India.";

  return {
    ...(await createSeoMetadata({
      title,
      description,
      path: "/",
    })),
    metadataBase: new URL(settings.url),
    applicationName: settings.name,
    category: "technology",
    classification: "Software engineering, custom business software and digital product development",
    keywords: [
      settings.name,
      "software development company",
      "custom software development",
      "business software",
      "web application development",
      "ERP software",
      "POS software",
      "billing software",
      "business automation",
      "mobile app development",
      "AI integrations",
    ],
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
    <html lang="en-IN" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        <style>{premiumTypographyCss}</style>
      </head>
      <body style={{ fontFamily: "var(--font-body), ui-sans-serif, system-ui, sans-serif" }}>
        <PreviewBanner />
        <BrandIntro />
        <OfflineMonitor />
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
