"use client";

import { createDataAttribute, useOptimistic } from "@sanity/visual-editing/react";
import { dataset, projectId } from "@/sanity/lib/env";

type VisualEditingBlock = {
  _key: string;
  _type: string;
};

type RenderedBlock = {
  key: string;
  node: React.ReactNode;
};

type VisualEditingDocument = {
  blocks?: VisualEditingBlock[];
};

export default function VisualEditingBlocks({
  documentId,
  documentType,
  blocks,
  renderedBlocks,
}: {
  documentId: string;
  documentType: string;
  blocks: VisualEditingBlock[];
  renderedBlocks: RenderedBlock[];
}) {
  const orderedBlocks = useOptimistic<VisualEditingBlock[], VisualEditingDocument>(
    blocks,
    (currentBlocks, action) => {
      if (action.id !== documentId || !action.document.blocks) {
        return currentBlocks;
      }

      return action.document.blocks.map(
        (block) =>
          currentBlocks.find((currentBlock) => currentBlock._key === block._key) ??
          block,
      );
    },
  );

  const renderedByKey = new Map(
    renderedBlocks.map((block) => [block.key, block.node]),
  );

  const dataAttribute = ({ path }: { path: string }) =>
    createDataAttribute({
      projectId,
      dataset,
      baseUrl: process.env.NEXT_PUBLIC_STUDIO_URL,
      id: documentId,
      type: documentType,
      path,
    }).toString();

  return (
    <div data-sanity={dataAttribute({ path: "blocks" })}>
      {orderedBlocks.map((block) => (
        <div
          data-sanity={dataAttribute({
            path: `blocks[_key=="${block._key}"]`,
          })}
          key={block._key}
        >
          {renderedByKey.get(block._key) ?? null}
        </div>
      ))}
    </div>
  );
}
