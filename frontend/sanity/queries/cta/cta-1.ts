import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";
import { bodyQuery } from "../shared/body";

// @sanity-typegen-ignore
export const cta1Query = groq`
  _type == "cta-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
    links[]{
      ${linkQuery}
    },
  }
`;
