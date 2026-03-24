import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";

import { PAGE_QUERY_RESULT } from "@/sanity.types";

type SectionHeaderProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "section-header" }
>;

export default function SectionHeader({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  description,
}: SectionHeaderProps) {
  const isNarrow = sectionWidth === "narrow";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          stackAlign === "center"
            ? "max-w-[48rem] text-center mx-auto"
            : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined,
        )}
      >
        <div
          className={cn(
            colorVariant === "primary" ? "text-background" : undefined,
          )}
        >
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>
        </div>
        <p>{description}</p>
      </div>
    </SectionContainer>
  );
}
