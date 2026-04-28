import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const footer2Query = groq`
  _type == "footer-2" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    body,
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
    legalLinks[]{
      _key,
      title,
      href,
    },
  }
`;
