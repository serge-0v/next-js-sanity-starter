import Link from "next/link";

import PortableTextRenderer from "@/components/portable-text-renderer";
import SectionContainer from "@/components/ui/section-container";
import ActionLinkButton from "@/components/blocks/shared/action-link-button";

type Footer2Props = {
  padding?: any;
  colorVariant?: any;
  title?: string | null;
  body?: any;
  links?:
    | Array<{
        _key?: string;
        title?: string | null;
        href?: string | null;
        target?: boolean | null;
        buttonVariant?: any;
      }>
    | null;
  legalLinks?:
    | Array<{
        _key?: string;
        title?: string | null;
        href?: string | null;
      }>
    | null;
};

export default function Footer2({
  padding,
  colorVariant,
  title,
  body,
  links,
  legalLinks,
}: Footer2Props) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="space-y-8 border-t pt-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
            {body && <PortableTextRenderer value={body} />}
          </div>
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <ActionLinkButton
                  key={link._key}
                  title={link.title}
                  href={link.href}
                  target={link.target}
                  variant={link.buttonVariant}
                />
              ))}
            </div>
          )}
        </div>
        {legalLinks && legalLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {legalLinks.map((item) => (
              <Link
                key={item._key}
                href={item.href || "#"}
                className="hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
