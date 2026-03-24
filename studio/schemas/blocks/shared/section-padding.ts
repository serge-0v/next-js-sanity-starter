import { defineField, defineType } from "sanity";

export default defineType({
  name: "section-padding",
  type: "object",
  title: "Padding",
  description: "Add padding to the section. Based on design system spacing",
  fields: [
    defineField({
      name: "top",
      type: "boolean",
      title: "Top Padding",
    }),
    defineField({
      name: "bottom",
      type: "boolean",
      title: "Bottom Padding",
    }),
  ],
});
