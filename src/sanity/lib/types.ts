import type { PortableTextBlock } from "sanity";

export type SanitySlug = {
  current?: string;
};

export type SanityImage = {
  alt?: string;
  asset?: {
    _ref?: string;
  };
};

export type BlogPost = {
  _id: string;
  title?: string;
  slug?: SanitySlug;
  excerpt?: string;
  body?: PortableTextBlock[];
  featuredImage?: SanityImage;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
};

export type CaseStudyMetric = {
  label?: string;
  value?: string;
};

export type CaseStudy = {
  _id: string;
  title?: string;
  slug?: SanitySlug;
  clientName?: string;
  industry?: string;
  serviceType?: string;
  summary?: string;
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  outcome?: PortableTextBlock[];
  metrics?: CaseStudyMetric[];
  gallery?: SanityImage[];
  featuredImage?: SanityImage;
  technologies?: string[];
  testimonial?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
};
