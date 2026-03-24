import { groq } from "next-sanity";

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"]{
    _type,
    _key,
    links
  }
`;
