import { groq } from "next-sanity";

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc)[0...6] {
    _id, title, slug, excerpt, featuredImage, author, category, tags, publishedAt
  }
`;

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, featuredImage, author, category, tags, publishedAt,
    seoTitle, seoDescription, ogImage
  }
`;

export const latestCaseStudiesQuery = groq`
  *[_type == "caseStudy" && status == "published"] | order(publishedAt desc)[0...6] {
    _id, title, slug, clientName, industry, serviceType, summary, outcome, featuredImage, publishedAt
  }
`;

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] { "slug": slug.current }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, clientName, industry, serviceType, summary, challenge, solution, outcome,
    metrics, gallery, featuredImage, technologies, testimonial, publishedAt,
    seoTitle, seoDescription, ogImage
  }
`;

export const resourcesListQuery = groq`
  *[_type == "resource" && status == "published"] | order(publishedAt desc) {
    _id, title, slug, excerpt, resourceType, featuredImage, category, publishedAt
  }
`;

export const serviceListQuery = groq`
  *[_type == "service" && published == true] | order(title asc) {
    _id, title, slug, shortDescription, heroImage, ctaLabel
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
    socialLinks, defaultSeoTitle, defaultSeoDescription, defaultOgImage
  }
`;
