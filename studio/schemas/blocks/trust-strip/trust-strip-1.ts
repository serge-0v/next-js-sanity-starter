import { defineArrayMember, defineField, defineType } from "sanity";
import { ShieldCheck } from "lucide-react";

const TRUST_ICON_OPTIONS = [
  { title: "Truck", value: "truck" },
  { title: "Rotate", value: "rotate-ccw" },
  { title: "Shield", value: "shield" },
  { title: "Star", value: "star" },
];

export default defineType({
  name: "trust-strip-1",
  title: "Trust Strip 1",
  type: "object",
  icon: ShieldCheck,
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
      name: "items",
      type: "array",
      validation: (rule) =>
        rule.min(1).max(4).error("Add between 1 and 4 trust items."),
      of: [
        defineArrayMember({
          name: "item",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              options: {
                list: TRUST_ICON_OPTIONS,
                layout: "radio",
              },
              initialValue: "truck",
              validation: (rule) =>
                rule.required().error("Select an icon for this trust item."),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) =>
                rule.required().error("Add a short trust title."),
            }),
            defineField({
              name: "description",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Trust item",
                subtitle,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "items.0.title",
    },
    prepare({ title }) {
      return {
        title: "Trust Strip 1",
        subtitle: title || "No trust items yet",
      };
    },
  },
});
