import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

async function getPagesSitemap(): Promise<MetadataRoute.Sitemap[]> {
  const pagesQuery = groq`
    *[_type == 'page'] | order(slug.current) {
      'url': $baseUrl + select(slug.current == 'index' => '', '/' + slug.current),
      'lastModified': _updatedAt,
      'changeFrequency': 'daily',
      'priority': select(
        slug.current == 'index' => 1,
        0.5
      )
    }
  `;

  const { data } = await sanityFetch({
    query: pagesQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

async function getPostsSitemap(): Promise<MetadataRoute.Sitemap[]> {
  const postsQuery = groq`
    *[_type == 'post'] | order(_updatedAt desc) {
      'url': $baseUrl + '/blog/' + slug.current,
      'lastModified': _updatedAt,
      'changeFrequency': 'weekly',
      'priority': 0.7
    }
  `;

  const { data } = await sanityFetch({
    query: postsQuery,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const [pages, posts] = await Promise.all([
    getPagesSitemap(),
    getPostsSitemap(),
  ]);

  return [...pages, ...posts];
}
