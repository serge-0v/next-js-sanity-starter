import SectionContainer from "@/components/ui/section-container";
import PostCard from "@/components/ui/post-card";
import Link from "next/link";
import { fetchSanityPosts } from "@/sanity/lib/fetch";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type AllPostsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "all-posts" }
>;

export default async function AllPosts({
  padding,
  colorVariant,
}: AllPostsProps) {
  const posts = await fetchSanityPosts();

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post?.slug?.current}
            className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={`/blog/${post?.slug?.current}`}
          >
            <PostCard
              title={post?.title ?? ""}
              excerpt={post?.excerpt ?? ""}
              image={post?.image ?? null}
            />
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
