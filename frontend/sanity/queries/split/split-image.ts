import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const splitImageQuery = groq`
  _type == "split-image" => {
    _type,
    _key,
    image{
      ${imageQuery}
    },
  }
`;
