import SectionContainer from "@/components/ui/section-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselCounter,
} from "@/components/ui/carousel";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

const IMAGE_SIZES = {
  one: "h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]",
  two: "h-[30rem] md:h-[22rem] lg:h-[30rem] xl:h-[35rem]",
  three: "h-[30rem] md:h-[20rem] xl:h-[25rem]",
} as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;

type Carousel1 = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "carousel-1" }
>;

interface Carousel1Props extends Omit<
  NonNullable<Carousel1>,
  "_type" | "_key"
> {
  size: CarouselSize | null;
  indicators: "none" | "dots" | "count" | null;
}

export default function Carousel1({
  padding,
  colorVariant,
  size = "one",
  indicators = "none",
  images,
}: Carousel1Props) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {images && images.length > 0 && (
        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={`${index}-${image.alt}`}
                className={CAROUSEL_SIZES[size as CarouselSize]}
              >
                {image && (
                  <div
                    className={cn(
                      "relative mx-auto overflow-hidden rounded-2xl",
                      IMAGE_SIZES[size as CarouselSize],
                      size === "one" ? "max-w-[35rem]" : undefined,
                    )}
                  >
                    <Image
                      className="object-cover"
                      src={urlFor(image).url()}
                      alt={image.alt || ""}
                      fill
                      placeholder={
                        image?.asset?.metadata?.lqip ? "blur" : undefined
                      }
                      blurDataURL={image.asset?.metadata?.lqip || ""}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      quality={100}
                    />
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="-left-3 md:-left-8 xl:-left-12"
          />
          <CarouselNext
            variant="secondary"
            className="-right-3 md:-right-8 xl:-right-12"
          />
          {indicators !== "none" && (
            <div className="w-full flex justify-center">
              {indicators === "dots" && <CarouselDots />}
              {indicators === "count" && <CarouselCounter />}
            </div>
          )}
        </Carousel>
      )}
    </SectionContainer>
  );
}
