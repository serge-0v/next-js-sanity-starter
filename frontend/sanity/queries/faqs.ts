import { groq } from "next-sanity";
import { bodyQuery } from "./shared/body";

// @sanity-typegen-ignore
export const faqsQuery = groq`
  _type == "faqs" => {
    _type,
    _key,
    padding,
    colorVariant,
    faqs[]->{
      _id,
      title,
      body[]{
        ${bodyQuery}
      },
    },
  }
`;
