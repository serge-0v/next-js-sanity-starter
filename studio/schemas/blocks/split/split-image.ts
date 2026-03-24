import { defineField, defineType } from "sanity";
import { Image } from "lucide-react";

export default defineType({
  name: "split-image",
  type: "object",
  icon: Image,
  description: "Column with full image.",
  fields: [
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "image.alt",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
