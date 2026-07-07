import { blogPost } from "@/sanity/schemaTypes/blogPost";
import { caseStudy } from "@/sanity/schemaTypes/caseStudy";
import { faq } from "@/sanity/schemaTypes/faq";
import { resource } from "@/sanity/schemaTypes/resource";
import { service } from "@/sanity/schemaTypes/service";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";
import { testimonial } from "@/sanity/schemaTypes/testimonial";

export const schemaTypes = [blogPost, caseStudy, resource, service, testimonial, faq, siteSettings];
