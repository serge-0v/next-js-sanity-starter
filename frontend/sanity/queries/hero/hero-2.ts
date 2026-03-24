import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";
import { bodyQuery } from "../shared/body";

// @sanity-typegen-ignore
export const hero2Query = groq`
  _type == "hero-2" => {
    _type,
    _key,
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
