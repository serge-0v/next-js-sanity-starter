import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const gridPostQuery = groq`
  _type == "grid-post" => {
    _type,
    _key,
    post->{
      title,
      slug,
      excerpt,
      image{
        ${imageQuery}
      },
      categories[]->{
        _id,
        title,
      },
    },
  }
`;
