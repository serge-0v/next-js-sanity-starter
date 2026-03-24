import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";
import { imageQuery } from "../shared/image";
import { bodyQuery } from "../shared/body";

// @sanity-typegen-ignore
export const hero1Query = groq`
  _type == "hero-1" => {
    _type,
    _key,
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
    image{
      ${imageQuery}
    },
    links[]{
      ${linkQuery}
    },
  }
`;
