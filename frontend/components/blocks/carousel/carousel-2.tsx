import SectionContainer from "@/components/ui/section-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { StarRating } from "@/components/ui/star-rating";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Carousel2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "carousel-2" }
>;

export default function Carousel2({
  padding,
  colorVariant,
  testimonial,
}: Carousel2Props) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {testimonial && testimonial.length > 0 && (
        <Carousel>
          <CarouselContent>
            {testimonial.map((item) => (
              <CarouselItem
                key={item._id}
                className="pl-2 md:pl-4 md:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col justify-between p-4 h-full">
                    <div>
                      <div className="flex items-center mb-2">
                        <Avatar className="w-10 h-10 mr-3">
                          {item.image && (
                            <AvatarImage
                              src={urlFor(item.image).url()}
                              alt={item.name ?? ""}
                            />
                          )}
                          <AvatarFallback>
                            {item.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={item.rating ?? 0} />
                      {item.body && (
                        <div className="text-sm mt-2 line-clamp-4">
                          <PortableTextRenderer value={item.body} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
          <div className="w-full flex justify-center">
            <CarouselDots />
          </div>
        </Carousel>
      )}
    </SectionContainer>
  );
}
