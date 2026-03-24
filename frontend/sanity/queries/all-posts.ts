import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const allPostsQuery = groq`
  _type == "all-posts" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;
