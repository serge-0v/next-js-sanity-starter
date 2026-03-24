import { defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
