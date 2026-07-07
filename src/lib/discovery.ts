import {
  blogDiscoveryQuery,
  caseStudyDiscoveryQuery,
  previewBlogDiscoveryQuery,
  previewCaseStudyDiscoveryQuery,
  previewResourcesListQuery,
  previewServiceListQuery,
  resourcesListQuery,
  serviceListQuery,
} from "@/sanity/lib/queries";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import type { BlogPost, CaseStudy, Resource, SanityImage, Service } from "@/sanity/lib/types";

export const DISCOVERY_PAGE_SIZE = 6;

export type SearchParamsInput = Record<string, string | string[] | undefined>;

export type DiscoveryItemType = "Blog" | "Case Study" | "Resource" | "Service";

export type DiscoveryItem = {
  id: string;
  type: DiscoveryItemType;
  title: string;
  description: string;
  href: string;
  image?: SanityImage;
  meta: string[];
  badges: string[];
  searchableText: string;
};

export type PaginationState = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: DiscoveryItem[];
};

export type DiscoveryData = {
  blog: BlogPost[];
  work: CaseStudy[];
  resources: Resource[];
  services: Service[];
};

export function getSearchParam(params: SearchParamsInput, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export function getPageNumber(params: SearchParamsInput) {
  const parsed = Number.parseInt(getSearchParam(params, "page"), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function compactStrings(items: Array<string | undefined>) {
  return items.filter((item): item is string => Boolean(item));
}

export function uniqueOptions(items: Array<string | undefined>) {
  return Array.from(new Set(compactStrings(items))).sort((a, b) => a.localeCompare(b));
}

export function formatShortDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

export function buildHref(pathname: string, params: SearchParamsInput, updates: Record<string, string | number | undefined>) {
  const next = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    const current = Array.isArray(value) ? value[0] : value;
    if (current) next.set(key, current);
  }

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === "" || value === 1) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
  }

  const query = next.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function paginateItems(items: DiscoveryItem[], requestedPage: number, pageSize = DISCOVERY_PAGE_SIZE): PaginationState {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    items: items.slice(start, start + pageSize),
  };
}

export function paginateList<T>(items: T[], requestedPage: number, pageSize = DISCOVERY_PAGE_SIZE) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    items: items.slice(start, start + pageSize),
  };
}

export async function getDiscoveryData(): Promise<DiscoveryData> {
  const [blog, work, resources, services] = await Promise.all([
    fetchSanityPreview<BlogPost[]>(blogDiscoveryQuery, previewBlogDiscoveryQuery),
    fetchSanityPreview<CaseStudy[]>(caseStudyDiscoveryQuery, previewCaseStudyDiscoveryQuery),
    fetchSanityPreview<Resource[]>(resourcesListQuery, previewResourcesListQuery),
    fetchSanityPreview<Service[]>(serviceListQuery, previewServiceListQuery),
  ]);

  return {
    blog: blog ?? [],
    work: work ?? [],
    resources: resources ?? [],
    services: services ?? [],
  };
}

export function blogToDiscoveryItem(post: BlogPost): DiscoveryItem {
  return {
    id: post._id,
    type: "Blog",
    title: post.title || "Untitled post",
    description: post.excerpt || "Read the latest TrustFirst insight.",
    href: `/blog/${post.slug?.current}`,
    image: post.featuredImage,
    meta: compactStrings([post.category, formatShortDate(post.publishedAt)]),
    badges: post.tags?.slice(0, 3) ?? [],
    searchableText: compactStrings([post.title, post.excerpt, post.category, ...(post.tags ?? [])]).join(" "),
  };
}

export function workToDiscoveryItem(study: CaseStudy): DiscoveryItem {
  const metrics = study.metrics
    ?.filter((metric) => metric.value && metric.label)
    .map((metric) => `${metric.value} ${metric.label}`);

  return {
    id: study._id,
    type: "Case Study",
    title: study.title || "Untitled case study",
    description: study.summary || "Read the TrustFirst project story.",
    href: `/work/${study.slug?.current}`,
    image: study.featuredImage,
    meta: compactStrings([study.clientName, study.industry, study.serviceType]),
    badges: metrics ?? [],
    searchableText: compactStrings([
      study.title,
      study.summary,
      study.industry,
      study.serviceType,
      ...(study.technologies ?? []),
    ]).join(" "),
  };
}

export function resourceToDiscoveryItem(resource: Resource): DiscoveryItem {
  return {
    id: resource._id,
    type: "Resource",
    title: resource.title || "Untitled resource",
    description: resource.excerpt || "Open this TrustFirst resource.",
    href: `/resources/${resource.slug?.current}`,
    image: resource.featuredImage,
    meta: compactStrings([resource.category, resource.resourceType, formatShortDate(resource.publishedAt)]),
    badges: compactStrings([
      resource.estimatedReadingTime ? `${resource.estimatedReadingTime} min read` : undefined,
      resource.attachmentUrl ? "Download" : undefined,
      resource.externalResourceUrl ? "External" : undefined,
    ]),
    searchableText: compactStrings([resource.title, resource.excerpt, resource.category, resource.resourceType]).join(" "),
  };
}

export function serviceToDiscoveryItem(service: Service): DiscoveryItem {
  return {
    id: service._id,
    type: "Service",
    title: service.title || "Untitled service",
    description: service.shortDescription || "Service information coming soon.",
    href: `/services/${service.slug?.current}`,
    image: service.heroImage,
    meta: compactStrings([service.serviceCategory]),
    badges: compactStrings([service.featured ? "Featured" : undefined]),
    searchableText: compactStrings([
      service.title,
      service.shortDescription,
      service.serviceCategory,
      ...(service.technologies ?? []),
    ]).join(" "),
  };
}

export function matchesQuery(item: DiscoveryItem, query: string) {
  if (!query.trim()) return true;
  return item.searchableText.toLowerCase().includes(query.trim().toLowerCase());
}
