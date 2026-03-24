import { defineType, defineField } from "sanity";
import { ListCollapse } from "lucide-react";

export default defineType({
  name: "faqs",
  type: "object",
  icon: ListCollapse,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQs",
      of: [
        {
          name: "faq",
          type: "reference",
          to: [{ type: "faq" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "faqs.0.title",
    },
    prepare({ title }) {
      return {
        title: "FAQs",
        subtitle: title || "No Title",
      };
    },
  },
});
