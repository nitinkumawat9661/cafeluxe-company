import { defineField, defineType } from "sanity";
import { portableText, seoFields, statusField } from "@/sanity/schemaTypes/shared";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
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
    defineField({ name: "clientName", title: "Client Name", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "serviceType", title: "Service Type", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "challenge", title: "Challenge", type: "array", of: portableText }),
    defineField({ name: "solution", title: "Solution", type: "array", of: portableText }),
    defineField({ name: "outcome", title: "Outcome", type: "array", of: portableText }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "testimonial", title: "Testimonial", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    statusField,
    ...seoFields,
  ],
});
