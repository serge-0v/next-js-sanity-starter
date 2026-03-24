import SectionContainer from "@/components/ui/section-container";
import Timeline1 from "@/components/blocks/timeline/timeline-1";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";

type TimelineRow = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "timeline-row" }
>;

export default function TimelineRow({
  padding,
  colorVariant,
  timelines,
}: TimelineRow) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {timelines && timelines?.length > 0 && (
        <div className="max-w-[48rem] mx-auto">
          {timelines?.map((timeline, index) => (
            <Timeline1
              key={index}
              color={colorVariant as ColorVariant}
              tagLine={timeline.tagLine}
              title={timeline.title}
              body={timeline.body}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
