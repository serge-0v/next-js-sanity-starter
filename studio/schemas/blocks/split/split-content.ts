import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-content",
  type: "object",
  icon: TextQuote,
  title: "Split Content",
  description: "Column with tag line, title and content body.",
  fields: [
    defineField({
      name: "sticky",
      type: "boolean",
      description: "Sticky column on desktop",
      initialValue: false,
    }),
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
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "link",
      type: "link",
      description:
        "Link to a page or external URL. Leave empty to hide the link.",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
