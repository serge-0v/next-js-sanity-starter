import { defineArrayMember, defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "footer-2",
  title: "Footer 2",
  type: "object",
  icon: Menu,
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
      name: "title",
      type: "string",
      validation: (rule) => rule.required().error("Add a footer heading."),
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "legalLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) =>
                rule.required().error("Add a label for legal navigation."),
            }),
            defineField({
              name: "href",
              type: "url",
              validation: (rule) =>
                rule
                  .required()
                  .uri({
                    allowRelative: true,
                    scheme: ["http", "https"],
                  })
                  .error("Add a valid URL."),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "href",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Footer 2",
        subtitle: title,
      };
    },
  },
});
