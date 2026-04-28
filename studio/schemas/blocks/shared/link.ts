import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      name: "isExternal",
      type: "boolean",
      title: "Is External",
      initialValue: false,
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal Link",
      to: [{ type: "page" }, { type: "post" }],
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "href",
      title: "href",
      type: "url",
      hidden: ({ parent }) => !parent?.isExternal,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "target",
      type: "boolean",
      title: "Open in new tab",
      initialValue: false,
      hidden: ({ parent }) => !parent?.isExternal,
    }),
    defineField({
      name: "buttonVariant",
      type: "button-variant",
      title: "Button Variant",
    }),
    defineField({
      name: "action",
      type: "string",
      title: "Action",
      description: "Optional action for special integrations such as Dr. Flex.",
      initialValue: "none",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dr. Flex: Toggle appointments", value: "drFlexToggleAppointments" },
        ],
        layout: "radio",
      },
    }),
  ],
});
