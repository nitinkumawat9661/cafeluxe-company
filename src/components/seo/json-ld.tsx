import { services, siteConfig } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          addressRegion: siteConfig.region,
          addressCountry: siteConfig.country,
        },
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
        provider: { "@id": `${siteConfig.url}/#organization` },
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
