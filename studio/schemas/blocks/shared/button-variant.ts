import { defineType } from "sanity";

export const BUTTON_VARIANTS = [
  { title: "Default", value: "default" },
  { title: "Destructive", value: "destructive" },
  { title: "Outline", value: "outline" },
  { title: "Secondary", value: "secondary" },
  { title: "Ghost", value: "ghost" },
  { title: "Link", value: "link" },
];

export const buttonVariant = defineType({
  name: "button-variant",
  title: "Button Variant",
  type: "string",
  options: {
    list: BUTTON_VARIANTS.map(({ title, value }) => ({ title, value })),
    layout: "radio",
  },
  initialValue: "default",
});
