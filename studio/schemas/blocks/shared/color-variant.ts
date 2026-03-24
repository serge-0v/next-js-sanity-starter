import { defineType } from "sanity";

export const COLOR_VARIANTS = [
  { title: "Background", value: "background" },
  { title: "Primary", value: "primary" },
  { title: "Secondary", value: "secondary" },
  { title: "Card", value: "card" },
  { title: "Accent", value: "accent" },
  { title: "Destructive", value: "destructive" },
  { title: "Muted", value: "muted" },
];

export const colorVariant = defineType({
  name: "color-variant",
  title: "Color Variant",
  type: "string",
  options: {
    list: COLOR_VARIANTS.map(({ title, value }) => ({ title, value })),
  },
  initialValue: "background",
});
