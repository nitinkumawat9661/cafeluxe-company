import type { Metadata } from "next";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { SikarGrowthLanding } from "@/components/sikar-growth-landing";
import { createSeoMetadata } from "@/lib/seo";
import { localSearchKeywords, sikarLandingFaqs } from "@/lib/seo/local-search";
import {
  faqPageSchema,
  localLandingPageSchema,
  organizationSchema,
  siteServiceSchemas,
  websiteSchema,
} from "@/lib/seo/structured-data";
import { getSiteSettings } from "@/sanity/lib/site-settings";

const path = "/digital-marketing-agency-sikar";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await createSeoMetadata({
      title: "Digital Marketing Agency in Sikar",
      description:
        "TrustFirst Solutions provides SEO, Google Ads, Meta Ads, performance marketing, social media, website development, Google Business Profile, lead generation and automation services in Sikar, Rajasthan.",
      path,
      imageAlt: "TrustFirst Solutions digital marketing agency in Sikar",
    })),
    keywords: localSearchKeywords,
  };
}

export default async function DigitalMarketingAgencySikarPage() {
  const settings = await getSiteSettings();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(settings),
      websiteSchema(settings),
      localLandingPageSchema(settings, path),
      ...siteServiceSchemas(settings),
      faqPageSchema(sikarLandingFaqs),
    ],
  };

  return (
    <>
      <JsonLdScript data={schema} />
      <SikarGrowthLanding whatsappHref={settings.whatsappHref} faqs={sikarLandingFaqs} />
    </>
  );
}
