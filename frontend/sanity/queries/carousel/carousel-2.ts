import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";
import { bodyQuery } from "../shared/body";

// @sanity-typegen-ignore
export const carousel2Query = groq`
  _type == "carousel-2" => {
    _type,
    _key,
    padding,
    colorVariant,
    testimonial[]->{
      _id,
      name,
      title,
      image{
        ${imageQuery}
      },
      body[]{
        ${bodyQuery}
      },
      rating,
    },
  }
`;
