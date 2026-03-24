"use client";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-cards-list" }
>;
type SplitCardItem = NonNullable<NonNullable<SplitCardsList["list"]>[number]>;

interface SplitCardsItemProps extends SplitCardItem {
  color?: ColorVariant;
}

export default function SplitCardsItem({
  color,
  tagLine,
  title,
  body,
}: SplitCardsItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex flex-col items-start border border-primary rounded-3xl px-6 lg:px-8 py-6 lg:py-8 transition-colors duration-1000 ease-in-out",
        isInView ? "bg-foreground/85" : "bg-background",
        color === "primary" ? "text-background" : undefined,
      )}
    >
      {tagLine && (
        <div
          className={cn(
            "font-bold text-2xl lg:text-3xl transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground",
            color === "primary" ? "text-background" : undefined,
          )}
        >
          {tagLine}
        </div>
      )}
      {title && (
        <div
          className={cn(
            "my-2 font-semibold text-xl transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground",
            color === "primary" ? "text-background" : undefined,
          )}
        >
          {title}
        </div>
      )}
      {body && (
        <div
          className={cn(
            "transition-colors duration-1000 ease-in-out",
            isInView ? "text-background" : "text-foreground",
          )}
        >
          <PortableTextRenderer value={body} />
        </div>
      )}
    </motion.div>
  );
}
