import { groq } from "next-sanity";
import { bodyQuery } from "./shared/body";

// @sanity-typegen-ignore
export const timelineQuery = groq`
  _type == "timeline-row" => {
    _type,
    _key,
    padding,
    colorVariant,
    timelines[]{
      title,
      tagLine,
      body[]{
        ${bodyQuery}
      },
    },
  }
`;
