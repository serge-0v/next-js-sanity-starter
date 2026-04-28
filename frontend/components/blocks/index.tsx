import { PAGE_QUERY_RESULT } from "@/sanity.types";
import Hero1 from "@/components/blocks/hero/hero-1";
import Hero2 from "@/components/blocks/hero/hero-2";
import SectionHeader from "@/components/blocks/section-header";
import SplitRow from "@/components/blocks/split/split-row";
import GridRow from "@/components/blocks/grid/grid-row";
import Carousel1 from "@/components/blocks/carousel/carousel-1";
import Carousel2 from "@/components/blocks/carousel/carousel-2";
import TimelineRow from "@/components/blocks/timeline/timeline-row";
import Cta1 from "@/components/blocks/cta/cta-1";
import Community1 from "@/components/blocks/community/community-1";
import LogoCloud1 from "@/components/blocks/logo-cloud/logo-cloud-1";
import TrustStrip1 from "@/components/blocks/trust-strip/trust-strip-1";
import About3 from "@/components/blocks/about/about-3";
import Footer2 from "@/components/blocks/footer/footer-2";
import FAQs from "@/components/blocks/faqs";
import FormNewsletter from "@/components/blocks/forms/newsletter";
import AllPosts from "@/components/blocks/all-posts";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];

const componentMap: Record<string, React.ComponentType<any>> = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "community-1": Community1,
  "logo-cloud-1": LogoCloud1,
  "trust-strip-1": TrustStrip1,
  "about-3": About3,
  "footer-2": Footer2,
  faqs: FAQs,
  "form-newsletter": FormNewsletter,
  "all-posts": AllPosts,
};

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          // Fallback for development/debugging of new component types
          console.warn(
            `No component implemented for block type: ${block._type}`,
          );
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...(block as any)} key={block._key} />;
      })}
    </>
  );
}
