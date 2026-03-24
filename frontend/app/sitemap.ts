import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const VIEWABLE_TYPES = ["page", "post"] as const;

const urlQuery = `
  'url': select(
    slug.current == "index" => $baseUrl + "/",
    _type == "post-index" => $baseUrl + "/blog",
    _type == "post" => $baseUrl + "/blog/" + slug.current,
    _type == "contact" => $baseUrl + "/contact",
    $baseUrl + "/" + slug.current
  )
`;

/** A single query that fetches all documents with a viewable url/page */
const SITEMAP_QUERY = groq`
  *[
    _type in $viewableTypes
    && meta.noindex != true
    && (defined(slug) || _type in ["contact", "post-index"])
  ] {
    ${urlQuery},
    "lastModified": _updatedAt,
    "changeFrequency": select(_type == "page" => "daily", "weekly"),
    "priority": select(
      _type == "page" && slug.current == "index" => 1,
      _type == "page" => 0.5,
      0.7
    )
  } | order(priority desc, url asc)
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({
    query: SITEMAP_QUERY,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL!,
      viewableTypes: [...VIEWABLE_TYPES],
    },
  });

  return data || [];
}
