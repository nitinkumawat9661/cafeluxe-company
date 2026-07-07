import { groq } from "next-sanity";

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost" && status == "published" && defined(slug.current)] | order(publishedAt desc)[0...6] {
    _id, title, slug, excerpt, featuredImage, author, category, tags, publishedAt
  }
`;

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost" && status == "published" && defined(slug.current)] { "slug": slug.current }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && status == "published" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, featuredImage, author, category, tags, publishedAt,
    seoTitle, seoDescription, ogImage
  }
`;

export const previewBlogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, featuredImage, author, category, tags, publishedAt,
    seoTitle, seoDescription, ogImage
  }
`;

export const latestCaseStudiesQuery = groq`
  *[_type == "caseStudy" && status == "published" && defined(slug.current)] | order(publishedAt desc)[0...6] {
    _id, title, slug, clientName, industry, serviceType, summary, outcome, metrics, featuredImage, publishedAt
  }
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && status == "published" && defined(slug.current)] { "slug": slug.current }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && status == "published" && slug.current == $slug][0] {
    _id, title, slug, clientName, industry, serviceType, summary, challenge, solution, outcome,
    metrics, gallery, featuredImage, technologies, testimonial, publishedAt,
    seoTitle, seoDescription, ogImage
  }
`;

export const previewCaseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, clientName, industry, serviceType, summary, challenge, solution, outcome,
    metrics, gallery, featuredImage, technologies, testimonial, publishedAt,
    seoTitle, seoDescription, ogImage
  }
`;

export const resourcesListQuery = groq`
  *[_type == "resource" && status == "published" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, slug, excerpt, resourceType, featuredImage, category, publishedAt,
    estimatedReadingTime, externalResourceUrl, "attachmentUrl": attachment.asset->url
  }
`;

export const allResourceSlugsQuery = groq`
  *[_type == "resource" && status == "published" && defined(slug.current)] { "slug": slug.current }
`;

export const resourceBySlugQuery = groq`
  *[_type == "resource" && status == "published" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, resourceType, featuredImage, category, author, publishedAt,
    estimatedReadingTime, externalResourceUrl, attachmentPreviewImage,
    "attachmentUrl": attachment.asset->url,
    "attachmentName": attachment.asset->originalFilename,
    seoTitle, seoDescription, ogImage,
    "relatedResources": *[
      _type == "resource" &&
      status == "published" &&
      defined(slug.current) &&
      slug.current != $slug &&
      category == ^.category
    ] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, resourceType, featuredImage, category, publishedAt,
      estimatedReadingTime, externalResourceUrl, "attachmentUrl": attachment.asset->url
    }
  }
`;

export const previewResourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, resourceType, featuredImage, category, author, publishedAt,
    estimatedReadingTime, externalResourceUrl, attachmentPreviewImage,
    "attachmentUrl": attachment.asset->url,
    "attachmentName": attachment.asset->originalFilename,
    seoTitle, seoDescription, ogImage,
    "relatedResources": *[
      _type == "resource" &&
      status == "published" &&
      defined(slug.current) &&
      slug.current != $slug &&
      category == ^.category
    ] | order(publishedAt desc)[0...3] {
      _id, title, slug, excerpt, resourceType, featuredImage, category, publishedAt,
      estimatedReadingTime, externalResourceUrl, "attachmentUrl": attachment.asset->url
    }
  }
`;

export const serviceListQuery = groq`
  *[_type == "service" && published == true && defined(slug.current)] | order(coalesce(displayOrder, 999) asc, title asc) {
    _id, title, slug, shortDescription, heroImage, icon, serviceCategory,
    featured, displayOrder, ctaLabel, ctaHref
  }
`;

export const allServiceSlugsQuery = groq`
  *[_type == "service" && published == true && defined(slug.current)] { "slug": slug.current }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && published == true && slug.current == $slug][0] {
    _id, title, slug, shortDescription, fullDescription, heroImage, icon, serviceCategory,
    features, benefits, deliverables, processSteps, process, technologies, faqs,
    featured, displayOrder, ctaTitle, ctaDescription, ctaLabel, ctaHref,
    seoTitle, seoDescription, ogImage,
    "relatedServices": *[
      _type == "service" &&
      published == true &&
      defined(slug.current) &&
      slug.current != $slug
    ] | order(coalesce(displayOrder, 999) asc, title asc)[0...3] {
      _id, title, slug, shortDescription, heroImage, icon, serviceCategory,
      featured, displayOrder, ctaLabel, ctaHref
    }
  }
`;

export const previewServiceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, shortDescription, fullDescription, heroImage, icon, serviceCategory,
    features, benefits, deliverables, processSteps, process, technologies, faqs,
    featured, displayOrder, ctaTitle, ctaDescription, ctaLabel, ctaHref,
    seoTitle, seoDescription, ogImage,
    "relatedServices": *[
      _type == "service" &&
      published == true &&
      defined(slug.current) &&
      slug.current != $slug
    ] | order(coalesce(displayOrder, 999) asc, title asc)[0...3] {
      _id, title, slug, shortDescription, heroImage, icon, serviceCategory,
      featured, displayOrder, ctaLabel, ctaHref
    }
  }
`;

export const publishedFaqsQuery = groq`
  *[_type == "faq" && published == true] | order(order asc) {
    _id, question, answer, category, order
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    brandName, tagline, description, logo, phone, whatsapp, email, address,
    socialLinks, defaultSeoTitle, defaultSeoDescription, defaultOgImage, favicon
  }
`;
