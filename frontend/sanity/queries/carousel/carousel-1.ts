import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const carousel1Query = groq`
  _type == "carousel-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    size,
    orientation,
    indicators,
    images[]{
      ${imageQuery}
    },
  }
`;
