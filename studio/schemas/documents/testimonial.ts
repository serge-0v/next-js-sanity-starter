import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    orderRankField({ type: "testimonial" }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
