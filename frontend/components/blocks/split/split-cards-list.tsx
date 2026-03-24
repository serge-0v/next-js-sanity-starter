import SplitCardsItem from "@/components/blocks/split/split-cards-item";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-cards-list" }
>;

interface SplitCardsListProps extends SplitCardsList {
  color?: ColorVariant;
}

export default function SplitCardsList({ color, list }: SplitCardsListProps) {
  return (
    <div className="flex flex-col justify-center gap-12">
      {list &&
        list.length > 0 &&
        list.map((item, index) => (
          <SplitCardsItem
            key={index}
            color={color}
            tagLine={item.tagLine}
            title={item.title}
            body={item.body}
          />
        ))}
    </div>
  );
}
