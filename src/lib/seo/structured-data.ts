import { absoluteUrl } from "@/lib/seo";
import type { SearchFaq } from "@/lib/seo/local-search";
import { services as serviceNames, siteConfig } from "@/lib/site";
import type { BlogPost, CaseStudy, Resource, Service } from "@/sanity/lib/types";
import type { ResolvedSiteSettings } from "@/sanity/lib/site-settings";

function serviceAreaEntities() {
  return siteConfig.serviceAreas.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  }));
}

export function organizationSchema(settings: ResolvedSiteSettings) {
  const organizationId = `${settings.url}/#organization`;

  return {
    "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
    "@id": organizationId,
    name: settings.name,
    url: settings.url,
    logo: absoluteUrl(settings.logoUrl, settings.url),
    description: settings.description,
    slogan: settings.tagline,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: settings.socialLinks.map((link) => link.url),
    areaServed: serviceAreaEntities(),
    knowsAbout: [
      "Digital marketing",
      "Local SEO",
      "Technical SEO",
      "Meta Ads",
      "Google Ads",
      "Social media management",
      "Content strategy",
      "Google Business Profile management",
      "Website development",
      "Landing pages",
      "Lead generation",
      "Marketing automation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Growth Services",
      itemListElement: serviceNames.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: { "@id": organizationId },
          areaServed: serviceAreaEntities(),
        },
      })),
    },
  };
}

export function websiteSchema(settings: ResolvedSiteSettings) {
  return {
    "@type": "WebSite",
    "@id": `${settings.url}/#website`,
    name: settings.name,
    url: settings.url,
    inLanguage: ["en-IN", "hi-IN"],
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
    areaServed: serviceAreaEntities(),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: settings.url,
      availableLanguage: ["English", "Hindi"],
    },
  }));
}

export function faqPageSchema(faqs: SearchFaq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function localLandingPageSchema(settings: ResolvedSiteSettings, path: string) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path, settings.url)}#webpage`,
    url: absoluteUrl(path, settings.url),
    name: "Digital Marketing Agency in Sikar",
    description:
      "SEO, Google Ads, Meta Ads, social media, website development, Google Business Profile, lead generation and automation services for businesses in Sikar.",
    inLanguage: "en-IN",
    isPartOf: { "@id": `${settings.url}/#website` },
    about: { "@id": `${settings.url}/#organization` },
    primaryImageOfPage: settings.defaultOgImageUrl
      ? {
          "@type": "ImageObject",
          url: settings.defaultOgImageUrl,
        }
      : undefined,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: settings.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Digital Marketing Agency in Sikar",
          item: absoluteUrl(path, settings.url),
        },
      ],
    },
  };
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
    areaServed: serviceAreaEntities(),
    url: absoluteUrl(path, settings.url),
  };
}
