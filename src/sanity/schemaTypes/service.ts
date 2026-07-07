import { defineField, defineType } from "sanity";
import { portableText, seoFields } from "@/sanity/schemaTypes/shared";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "fullDescription", title: "Full Description", type: "array", of: portableText }),
    defineField({ name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "deliverables", title: "Deliverables", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "processSteps", title: "Process Steps", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
    ...seoFields,
  ],
});
