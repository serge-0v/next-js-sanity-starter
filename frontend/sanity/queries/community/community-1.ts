import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const community1Query = groq`
  _type == "community-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    logo{
      ${imageQuery}
    },
    title,
    mutedTitle,
    links[]{
      title,
      href,
      icon,
    },
  }
`;
