import { defineField, defineType } from "sanity";
import { Mails } from "lucide-react";
import { STACK_ALIGN } from "../shared/layout-variants";

export default defineType({
  name: "form-newsletter",
  type: "object",
  title: "Form: Newsletter",
  description:
    "A subscription form ideal for collecting email addresses for newsletters and waitlists.",
  icon: Mails,
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
      name: "stackAlign",
      type: "string",
      title: "Stack Layout Alignment",
      options: {
        list: STACK_ALIGN.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "consentText",
      type: "text",
      initialValue:
        "By subscribing, you agree to receive emails from us. You can unsubscribe at any time.",
    }),
    defineField({
      name: "buttonText",
      type: "string",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "successMessage",
      type: "text",
      initialValue: "Thank you for subscribing!",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Newsletter Form",
      };
    },
  },
});
