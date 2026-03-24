import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridPost = Extract<GridColumn, { _type: "grid-post" }>;

interface GridPostProps extends Omit<NonNullable<GridPost>, "_type" | "_key"> {
  color?: ColorVariant;
}

export default function GridPost({ color, post }: GridPostProps) {
  if (!post) return null;

  const { title, slug, excerpt, image, categories } = post;

  return (
    <Link
      key={title}
      className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
      href={`/blog/${slug?.current}`}
    >
      <div
        className={cn(
          "flex w-full flex-col justify-between overflow-hidden transition ease-in-out group border rounded-3xl p-4 hover:border-primary",
          color === "primary"
            ? "group-hover:border-primary-foreground/50"
            : "group-hover:border-primary",
        )}
      >
        <div className="flex flex-col">
          {image && image.asset?._id && (
            <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-2xl overflow-hidden">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || ""}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || ""}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                quality={100}
              />
            </div>
          )}
          {title && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[1.5rem] leading-[1.2]">{title}</h3>
            </div>
          )}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Badge key={category._id} color="primary">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
          {excerpt && <p>{excerpt}</p>}
        </div>
        <div className="mt-3 xl:mt-6 w-10 h-10 border rounded-full flex items-center justify-center group-hover:border-primary">
          <ChevronRight
            className="text-border group-hover:text-primary"
            size={24}
          />
        </div>
      </div>
    </Link>
  );
}
