import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const trustStrip1Query = groq`
  _type == "trust-strip-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    items[]{
      _key,
      icon,
      title,
      description,
    },
  }
`;
