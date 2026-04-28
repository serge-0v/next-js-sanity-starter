import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import PortableTextRenderer from "@/components/portable-text-renderer";
import SectionContainer from "@/components/ui/section-container";
import ActionLinkButton from "@/components/blocks/shared/action-link-button";

type About3Link = {
  _key: string;
  title?: string | null;
  href?: string | null;
  target?: boolean | null;
  action?: string | null;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
};

type About3Props = {
  padding?: { top?: boolean | null; bottom?: boolean | null } | null;
  colorVariant?: string | null;
  tagLine?: string | null;
  title?: string | null;
  body?: any;
  image?: {
    alt?: string | null;
    asset?: { url?: string | null } | null;
  } | null;
  links?: About3Link[] | null;
};

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
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          {tagLine && (
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {tagLine}
            </p>
          )}
          <h2>{title}</h2>
          {body && <PortableTextRenderer value={body as any} />}
          {links && links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((link) => (
                <ActionLinkButton
                  key={link._key}
                  title={link.title}
                  href={link.href}
                  target={link.target}
                  action={link.action}
                  variant={link.buttonVariant}
                />
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
