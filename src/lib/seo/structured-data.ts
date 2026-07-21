import { absoluteUrl } from "@/lib/seo";
import { services as serviceNames, siteConfig } from "@/lib/site";
import type { BlogPost, CaseStudy, Resource, Service } from "@/sanity/lib/types";
import type { ResolvedSiteSettings } from "@/sanity/lib/site-settings";

export function organizationSchema(settings: ResolvedSiteSettings) {
  const organizationId = `${settings.url}/#organization`;

  return {
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
      "Digital marketing",
      "Meta Ads",
      "Google Ads",
      "SEO",
      "Social media management",
      "Google Business Profile management",
      "Lead generation",
      "Landing pages",
      "Marketing automation",
    ],
  };
}

export function websiteSchema(settings: ResolvedSiteSettings) {
  return {
    "@type": "WebSite",
    "@id": `${settings.url}/#website`,
    name: settings.name,
    url: settings.url,
    publisher: { "@id": `${settings.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${settings.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function siteServiceSchemas(settings: ResolvedSiteSettings) {
  return serviceNames.map((service) => ({
    "@type": "Service",
    name: service,
    provider: { "@id": `${settings.url}/#organization` },
    areaServed: siteConfig.serviceAreas,
  }));
}

export function blogArticleSchema(post: BlogPost, settings: ResolvedSiteSettings, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author ? { "@type": "Person", name: post.author } : { "@id": `${settings.url}/#organization` },
    publisher: { "@id": `${settings.url}/#organization` },
    mainEntityOfPage: absoluteUrl(path, settings.url),
  };
}

export function caseStudySchema(study: CaseStudy, settings: ResolvedSiteSettings, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    about: study.industry,
    creator: { "@id": `${settings.url}/#organization` },
    url: absoluteUrl(path, settings.url),
  };
}

export function resourceSchema(resource: Resource, settings: ResolvedSiteSettings, path: string) {
  const type = resource.resourceType?.toLowerCase().includes("technical") ? "TechArticle" : "Article";

  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: resource.title,
    description: resource.excerpt,
    datePublished: resource.publishedAt,
    author: resource.author ? { "@type": "Person", name: resource.author } : { "@id": `${settings.url}/#organization` },
    publisher: { "@id": `${settings.url}/#organization` },
    mainEntityOfPage: absoluteUrl(path, settings.url),
  };
}

export function serviceSchema(service: Service, settings: ResolvedSiteSettings, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    serviceType: service.serviceCategory,
    provider: { "@id": `${settings.url}/#organization` },
    areaServed: siteConfig.serviceAreas,
    url: absoluteUrl(path, settings.url),
  };
}
