import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";
import { bodyQuery } from "../shared/body";

// @sanity-typegen-ignore
export const splitInfoListQuery = groq`
  _type == "split-info-list" => {
    _type,
    _key,
    list[]{
      image{
        ${imageQuery}
      },
      title,
      body[]{
        ${bodyQuery}
      },
      tags[],
    },
  }
`;
