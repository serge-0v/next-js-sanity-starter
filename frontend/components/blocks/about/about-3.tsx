import Image from "next/image";
import Link from "next/link";

import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";

type About3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "about-3" }
>;

export default function About3({
  padding,
  colorVariant,
  tagLine,
  title,
  body,
  image,
  links,
}: About3Props) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {tagLine && (
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {tagLine}
            </p>
          )}
          <h2>{title}</h2>
          {body && <PortableTextRenderer value={body} />}
          {links && links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((link) => (
                <Button key={link._key} variant={link.buttonVariant} asChild>
                  <Link
                    href={link.href || "#"}
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener noreferrer" : undefined}
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        {image?.asset?.url && (
          <Image
            src={urlFor(image).width(1200).height(900).url()}
            alt={image.alt || title || "About image"}
            width={1200}
            height={900}
            className="w-full rounded-xl object-cover"
          />
        )}
      </div>
    </SectionContainer>
  );
}
