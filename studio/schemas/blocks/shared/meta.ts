import { defineField } from "sanity";

export default defineField({
  name: "meta",
  title: "Meta",
  type: "object",
  group: "seo",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
    }),
  ],
});
