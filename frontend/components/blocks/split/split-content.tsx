import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import TagLine from "@/components/ui/tag-line";
import { createElement } from "react";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import ActionLinkButton from "@/components/blocks/shared/action-link-button";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitContent = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-content" }
>;

interface SplitContentProps extends SplitContent {
  noGap?: boolean;
}

export default function SplitContent({
  sticky,
  padding,
  noGap,
  tagLine,
  title,
  body,
  link,
}: SplitContentProps) {
  return (
    <div
      className={cn(
        !sticky ? "flex flex-col justify-center" : undefined,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined,
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start",
          sticky ? "lg:sticky lg:top-56" : undefined,
          noGap ? "px-10" : undefined,
        )}
      >
        {tagLine && <TagLine title={tagLine} element="h2" />}
        {title &&
          createElement(
            tagLine ? "h3" : "h2",
            {
              className: cn("my-4 font-semibold leading-[1.2]"),
            },
            title,
          )}
        {body && <PortableTextRenderer value={body} />}
        {link?.title && (
          <div className="flex flex-col">
            <ActionLinkButton
              className="mt-2"
              variant={link.buttonVariant}
              size="lg"
              title={link.title}
              href={link.href}
              target={link.target}
            />
          </div>
        )}
      </div>
    </div>
  );
}
