import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";

// @sanity-typegen-ignore
export const pricingCardQuery = groq`
  _type == "pricing-card" => {
    _type,
    _key,
    title,
    tagLine,
    price,
    list[],
    excerpt,
    link{
      ${linkQuery}
    },
  }
`;
