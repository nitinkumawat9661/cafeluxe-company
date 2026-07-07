import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "clientName", title: "Client Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "relatedService", title: "Related Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
  ],
});
