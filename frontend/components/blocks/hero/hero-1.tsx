import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import ActionLinkButton from "@/components/blocks/shared/action-link-button";

type Hero1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-1" }
>;

export default function Hero1({
  tagLine,
  title,
  body,
  image,
  links,
}: Hero1Props) {
  return (
    <div className="container dark:bg-background py-20 lg:pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          {tagLine && (
            <h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          {title && (
            <h2 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
              {title}
            </h2>
          )}
          {body && (
            <div className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0">
              <PortableTextRenderer value={body} />
            </div>
          )}
          {links && links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
              {links.map((link) => (
                <ActionLinkButton
                  key={link._key ?? link.title}
                  title={link.title}
                  href={link.href}
                  target={link.target}
                  variant={link.buttonVariant}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          {image && image.asset?._id && (
            <Image
              className="rounded-xl animate-fade-up [animation-delay:500ms] opacity-0"
              src={urlFor(image).url()}
              alt={image.alt || ""}
              width={image.asset?.metadata?.dimensions?.width || 800}
              height={image.asset?.metadata?.dimensions?.height || 800}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              quality={100}
            />
          )}
        </div>
      </div>
    </div>
  );
}
