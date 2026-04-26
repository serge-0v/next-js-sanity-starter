import { defineArrayMember, defineField, defineType } from "sanity";
import { UsersRound } from "lucide-react";

const SOCIAL_ICON_OPTIONS = [
  { title: "X / Twitter", value: "x" },
  { title: "GitHub", value: "github" },
  { title: "Discord", value: "discord" },
];

export default defineType({
  name: "community-1",
  title: "Community 1",
  type: "object",
  icon: UsersRound,
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
      name: "logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().error("Add a community headline."),
    }),
    defineField({
      name: "mutedTitle",
      type: "string",
      title: "Muted Title",
      description: "Second line of the headline shown in muted text.",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialLink",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) =>
                rule.required().error("Add a label for this social link."),
            }),
            defineField({
              name: "href",
              type: "url",
              validation: (rule) =>
                rule
                  .required()
                  .uri({ scheme: ["http", "https"] })
                  .error("Add a valid social URL."),
            }),
            defineField({
              name: "icon",
              type: "string",
              options: {
                list: SOCIAL_ICON_OPTIONS,
                layout: "radio",
              },
              initialValue: "x",
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
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Community 1",
        subtitle: title,
      };
    },
  },
});
