import { getDrFlexScriptUrl, hasDrFlexAction, isDrFlexEnabled } from "@/lib/dr-flex";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];

export default function DrFlexScript({ blocks }: { blocks: Block[] }) {
  const enabled = isDrFlexEnabled();
  const scriptUrl = getDrFlexScriptUrl();
  const hasAction = hasDrFlexAction(blocks);

  if (!enabled) {
    return null;
  }

  if (!scriptUrl || !hasAction) {
    return null;
  }

  return <script src={scriptUrl} />;
}
