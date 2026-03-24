import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { bodyQuery } from "./shared/body";
import { metaQuery } from "./shared/meta";

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    image{
      ${imageQuery}
    },
    body[]{
      ${bodyQuery}
    },
    author->{
      name,
      image {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    _createdAt,
    _updatedAt,
    ${metaQuery},
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    image{
      ${imageQuery}
    },
}`;

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug)]{slug}`;
