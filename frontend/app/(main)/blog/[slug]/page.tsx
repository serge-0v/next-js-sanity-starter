import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostHero from "@/components/blocks/post-hero";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  fetchSanityPostBySlug,
  fetchSanityPostsStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";

type BreadcrumbLink = {
  label: string;
  href: string;
};

export async function generateStaticParams() {
  const posts = await fetchSanityPostsStaticParams();

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `blog/${params.slug}` });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug(params);

  if (!post) {
    notFound();
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: post.title as string,
          href: "#",
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <Breadcrumbs links={links} />
          <PostHero {...post} />
          {post.body && <PortableTextRenderer value={post.body} />}
        </article>
      </div>
    </section>
  );
}
