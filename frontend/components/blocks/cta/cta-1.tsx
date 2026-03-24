import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Cta1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "cta-1" }
>;

export default function Cta1({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  body,
  links,
}: Cta1Props) {
  const isNarrow = sectionWidth === "narrow";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          stackAlign === "center"
            ? "max-w-[48rem] text-center mx-auto"
            : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined,
        )}
      >
        <div
          className={cn(
            colorVariant === "primary" ? "text-background" : undefined,
          )}
        >
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2 className="mb-4">{title}</h2>
          {body && <PortableTextRenderer value={body} />}
        </div>
        {links && links.length > 0 && (
          <div
            className={cn(
              "mt-10 flex flex-wrap gap-4",
              stackAlign === "center" ? "justify-center" : undefined,
            )}
          >
            {links &&
              links.length > 0 &&
              links.map((link) => (
                <Button key={link.title} variant={link?.buttonVariant} asChild>
                  <Link
                    href={link.href || "#"}
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener" : undefined}
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
