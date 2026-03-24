import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type PricingCard = Extract<GridColumn, { _type: "pricing-card" }>;

interface PricingCardProps extends Omit<PricingCard, "_type" | "_key"> {
  color?: ColorVariant;
}

export default function PricingCard({
  color,
  title,
  tagLine,
  excerpt,
  price,
  list,
  link,
}: PricingCardProps) {
  return (
    <div
      key={title}
      className="flex w-full rounded-3xl ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
    >
      <div className="flex w-full flex-col justify-between border rounded-3xl p-8">
        <div
          className={cn(color === "primary" ? "text-background" : undefined)}
        >
          {title && (
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl leading-[1.2]">{title}</h3>
              {tagLine && <Badge>{tagLine}</Badge>}
            </div>
          )}
          {price && price.value !== null && price.value !== undefined && (
            <div className="flex items-end my-8 gap-1">
              <div className="text-3xl font-bold leading-none">
                ${price.value}
              </div>
              {price.period && <div className="text-sm">{price.period}</div>}
            </div>
          )}
          {list && list.length > 0 && (
            <ul className="flex flex-col gap-2 my-8">
              {list.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {excerpt && <p>{excerpt}</p>}
        </div>
        <Button
          className="mt-6"
          size="lg"
          variant={link?.buttonVariant}
          asChild
        >
          <Link
            href={link?.href ? link.href : "#"}
            target={link?.target ? "_blank" : undefined}
          >
            {link?.title}
          </Link>
        </Button>
      </div>
    </div>
  );
}
