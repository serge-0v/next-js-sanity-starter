import { defineField, defineType } from "sanity";
import { ListCollapse } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: ListCollapse,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    orderRankField({ type: "faq" }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
