import Link from "next/link";

import { PAGE_QUERY_RESULT } from "@/sanity.types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";

type Footer2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "footer-2" }
>;

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
