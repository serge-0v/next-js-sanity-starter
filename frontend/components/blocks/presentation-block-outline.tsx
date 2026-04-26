"use client";

import { createDataAttribute } from "next-sanity";
import { dataset, projectId } from "@/sanity/lib/env";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type PageWithBlocks = NonNullable<PAGE_QUERY_RESULT> & {
  _id: string;
  _type: "page";
};

type Block = NonNullable<PageWithBlocks["blocks"]>[number];

const blockLabels: Record<Block["_type"], string> = {
  "all-posts": "All Posts",
  "carousel-1": "Image Carousel",
  "carousel-2": "Testimonial Carousel",
  "cta-1": "Call to Action",
  faqs: "FAQs",
  "form-newsletter": "Newsletter Form",
  "grid-row": "Grid Row",
  "hero-1": "Hero 1",
  "hero-2": "Hero 2",
  "logo-cloud-1": "Logo Cloud",
  "section-header": "Section Header",
  "split-row": "Split Row",
  "timeline-row": "Timeline Row",
};

export default function PresentationBlockOutline({
  page,
}: {
  page: PageWithBlocks;
}) {
  const blocks = page.blocks ?? [];

  if (!blocks.length) {
    return null;
  }

  const dataAttribute = ({ path }: { path: string }) =>
    createDataAttribute({
      projectId,
      dataset,
      baseUrl: process.env.NEXT_PUBLIC_STUDIO_URL,
      id: page._id,
      type: page._type,
      path,
    }).toString();

  return (
    <aside
      className="container py-6"
      data-sanity={dataAttribute({ path: "blocks" })}
      data-sanity-drag-flow="vertical"
    >
      <div className="rounded-2xl border border-dashed bg-muted/40 p-4">
        <div className="mb-4">
          <p className="text-sm font-semibold">Presentation block order</p>
          <p className="text-xs text-muted-foreground">
            Drag these cards in Sanity Presentation to reorder root page blocks.
          </p>
        </div>
        <div className="grid gap-2">
          {blocks.map((block, index) => (
            <div
              className="flex items-center justify-between rounded-xl border bg-background px-4 py-3 shadow-xs"
              data-sanity={dataAttribute({
                path: `blocks[_key=="${block._key}"]`,
              })}
              key={block._key}
            >
              <div>
                <p className="text-sm font-medium">
                  {index + 1}. {blockLabels[block._type]}
                </p>
                <p className="text-xs text-muted-foreground">{block._type}</p>
              </div>
              <span className="text-xs text-muted-foreground">Drag</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
