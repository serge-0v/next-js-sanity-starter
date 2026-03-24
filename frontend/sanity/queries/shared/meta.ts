import { imageQuery } from "./image";

export const metaQuery = `
  meta{
    title,
    description,
    noindex,
    image{
      ${imageQuery}
    }
  }
`;
