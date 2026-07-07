import { absoluteUrl } from "@/lib/seo";
import { services, siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function JsonLd() {
  const settings = await getSiteSettings();
  const organizationId = `${settings.url}/#organization`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": organizationId,
        name: settings.name,
        url: settings.url,
        logo: absoluteUrl(settings.logoUrl, settings.url),
        description: settings.description,
        telephone: settings.phone,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.region,
          addressCountry: siteConfig.country,
        },
        sameAs: settings.socialLinks.map((link) => link.url),
        areaServed: siteConfig.serviceAreas,
        knowsAbout: [
          "Website development",
          "Web app development",
          "Custom software development",
          "Admin dashboard development",
          "Digital systems",
        ],
      },
      ...services.map((service) => ({
        "@type": "Service",
        name: service,
        provider: { "@id": organizationId },
        areaServed: siteConfig.serviceAreas,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
