import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const about3Query = groq`
  _type == "about-3" => {
    _type,
    _key,
    padding,
    colorVariant,
    tagLine,
    title,
    body,
    image{
      ${imageQuery}
    },
    links[]{
      _key,
      title,
      "href": select(
        defined(internalLink->slug.current) => "/" + internalLink->slug.current,
        href
      ),
      target,
      buttonVariant,
      action,
    },
  }
`;
