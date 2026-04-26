import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { AtSign, Code2, MessageCircle } from "lucide-react";
import { stegaClean } from "next-sanity";

import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";

type Community1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "community-1" }
>;

type SocialIcon = NonNullable<
  NonNullable<Community1Props["links"]>[number]
>["icon"];

const iconMap: Record<NonNullable<SocialIcon>, ComponentType> = {
  x: AtSign,
  github: Code2,
  discord: MessageCircle,
};

export default function Community1({
  padding,
  colorVariant,
  logo,
  title,
  mutedTitle,
  links,
}: Community1Props) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="flex flex-col items-center gap-5">
        {logo?.asset && (
          <Image
            src={urlFor(logo).width(80).height(80).url()}
            alt={logo.alt || ""}
            width={40}
            height={40}
            className="size-10 object-contain"
          />
        )}
        <h2 className="text-center text-3xl font-semibold">
          {title}
          {mutedTitle && (
            <>
              <br />
              <span className="text-muted-foreground/80">{mutedTitle}</span>
            </>
          )}
        </h2>
        {links && links.length > 0 && (
          <div className="flex items-center gap-4">
            {links.map((link) => {
              const icon = stegaClean(link.icon) as
                | keyof typeof iconMap
                | undefined;
              const Icon = iconMap[icon ?? "x"] ?? AtSign;

              return (
                <Button key={link.href} size="lg" variant="outline" asChild>
                  <Link
                    href={link.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10"
                    aria-label={link.title || "Community link"}
                  >
                    <Icon />
                  </Link>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
