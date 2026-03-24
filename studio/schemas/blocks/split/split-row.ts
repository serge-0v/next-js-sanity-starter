import { defineType, defineField } from "sanity";
import { SquareSplitHorizontal } from "lucide-react";

export default defineType({
  name: "split-row",
  type: "object",
  title: "Split Row",
  description:
    "Split Row: Customizable split row with multiple columns variants",
  icon: SquareSplitHorizontal,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "noGap",
      type: "boolean",
      description: "Remove gap between columns",
      initialValue: false,
    }),
    defineField({
      name: "splitColumns",
      type: "array",
      of: [
        { type: "split-content" },
        { type: "split-cards-list" },
        { type: "split-image" },
        { type: "split-info-list" },
      ],
      validation: (rule) => rule.max(2),
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/sanity/preview/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title0: "splitColumns.0.title",
      title1: "splitColumns.1.title",
    },
    prepare({ title0, title1 }) {
      return {
        title: "Split Row",
        subtitle: title0 || title1 || "No Title",
      };
    },
  },
});
