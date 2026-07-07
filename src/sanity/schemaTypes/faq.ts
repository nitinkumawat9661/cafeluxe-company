import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
  ],
});
