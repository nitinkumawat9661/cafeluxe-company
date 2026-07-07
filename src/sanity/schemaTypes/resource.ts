import { defineField, defineType } from "sanity";
import { portableText, seoFields, statusField } from "@/sanity/schemaTypes/shared";

export const resource = defineType({
  name: "resource",
  title: "Resource",
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
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: portableText }),
    defineField({
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: ["Guide", "Checklist", "Template", "Article"],
      },
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    statusField,
    ...seoFields,
  ],
});
