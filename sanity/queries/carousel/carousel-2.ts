import { groq } from "next-sanity";

export const carousel2Query = groq`
  _type == "carousel-2" => {
    _type,
    padding,
    colorVariant,
    testimonial[]->{
      _id,
      name,
      title,
      image{
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
      },
      body,
      rating,
    },
  },
`;