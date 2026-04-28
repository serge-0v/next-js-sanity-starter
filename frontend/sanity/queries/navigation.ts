import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"] | order(_updatedAt desc){
    _type,
    _key,
    links[]{
      ${linkQuery}
    }
  }
`;
