import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT, POST_QUERY_RESULT } from "@/sanity.types";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export function generatePageMetadata({
  page,
  slug,
}: {
  page: PAGE_QUERY_RESULT | POST_QUERY_RESULT;
  slug: string;
}) {
  return {
    title: page?.meta?.title,
    description: page?.meta?.description,
    openGraph: {
      images: [
        {
          url: page?.meta?.image
            ? urlFor(page?.meta?.image).quality(100).url()
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
          width: page?.meta?.image?.asset?.metadata?.dimensions?.width || 1200,
          height: page?.meta?.image?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page?.meta?.noindex
        ? "noindex"
        : "index, follow",
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_SITE_URL + `/${slug === "index" ? "" : slug}`,
    },
  };
}
