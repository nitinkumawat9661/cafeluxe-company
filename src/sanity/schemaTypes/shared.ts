import { defineArrayMember, defineField } from "sanity";

export const statusField = defineField({
  name: "status",
  title: "Status",
  type: "string",
  initialValue: "draft",
  options: {
    list: [
      { title: "Draft", value: "draft" },
      { title: "Published", value: "published" },
    ],
    layout: "radio",
  },
});

export const seoFields = [
  defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
  defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
  defineField({
    name: "ogImage",
    title: "Open Graph Image",
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
  }),
];

export const portableText = [
  defineArrayMember({ type: "block" }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
  }),
];
