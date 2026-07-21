import { cache } from "react";
import { siteConfig } from "@/lib/site";
import { fetchSanityPreview } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

type ResolvedSocialLink = {
  label: string;
  url: string;
};

export type ResolvedSiteSettings = {
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappDisplay: string;
  whatsappHref: string;
  email: string;
  address: string;
  socialLinks: ResolvedSocialLink[];
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImageUrl?: string;
  faviconUrl?: string;
  url: string;
};

function imageUrl(image?: SiteSettings["logo"], width = 1200, height = 630) {
  if (!image?.asset?._ref) return undefined;
  return urlForImage(image).width(width).height(height).fit("crop").auto("format").url();
}

function normalizePhoneHref(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return `tel:${cleaned}`;
  if (cleaned.length === 10) return `tel:+91${cleaned}`;
  return `tel:+${cleaned}`;
}

function normalizeWhatsAppNumber(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function formatIndiaPhone(number: string) {
  const digits = number.replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  if (local.length !== 10) return number;
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

function resolveCanonicalContactNumber(value?: string) {
  const retiredNumber = ["76658", "53321"].join("");
  if (!value || value.replace(/\D/g, "").endsWith(retiredNumber)) return siteConfig.phone;
  return value;
}

function normalizeSocialLinks(settings?: SiteSettings | null): ResolvedSocialLink[] {
  const cmsLinks =
    settings?.socialLinks
      ?.filter((link): link is ResolvedSocialLink => Boolean(link.label && link.url))
      .map((link) => ({ label: link.label, url: link.url })) ?? [];

  if (cmsLinks.length > 0) return cmsLinks;

  return Object.entries(siteConfig.social).map(([label, url]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    url,
  }));
}

function resolveSiteSettings(settings?: SiteSettings | null): ResolvedSiteSettings {
  const name = settings?.brandName || siteConfig.name;
  const tagline = settings?.tagline || siteConfig.tagline;
  const description = settings?.description || siteConfig.description;
  const phone = resolveCanonicalContactNumber(settings?.phone);
  const whatsapp = normalizeWhatsAppNumber(resolveCanonicalContactNumber(settings?.whatsapp));
  const email = settings?.email || siteConfig.email;
  const address = settings?.address || siteConfig.location;
  const defaultSeoTitle = settings?.defaultSeoTitle || name;
  const defaultSeoDescription = settings?.defaultSeoDescription || description;

  return {
    name,
    tagline,
    description,
    logoUrl: imageUrl(settings?.logo, 256, 256) || "/trustfirst-logo-original.png",
    phone,
    phoneHref: normalizePhoneHref(phone),
    whatsapp,
    whatsappDisplay: formatIndiaPhone(whatsapp),
    whatsappHref: `https://wa.me/${whatsapp}?text=Hi%20${encodeURIComponent(name)}%2C%20I%20want%20a%20free%20digital%20growth%20audit.`,
    email,
    address,
    socialLinks: normalizeSocialLinks(settings),
    defaultSeoTitle,
    defaultSeoDescription,
    defaultOgImageUrl: imageUrl(settings?.defaultOgImage),
    faviconUrl: imageUrl(settings?.favicon, 64, 64),
    url: siteConfig.url,
  };
}

export const getSiteSettings = cache(async (): Promise<ResolvedSiteSettings> => {
  const settings = await fetchSanityPreview<SiteSettings>(siteSettingsQuery);
  return resolveSiteSettings(settings);
});
