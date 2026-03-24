import Logo from "@/components/logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];

export default async function Footer() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();

  return (
    <footer>
      <div className="dark:bg-background pb-5 xl:pb-5 dark:text-gray-300 text-center">
        <Link
          href="/"
          className="inline-block text-center"
          aria-label="Home page"
        >
          <Logo settings={settings} />
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-primary">
          {navigation[0]?.links?.map((navItem: SanityLink) => (
            <Link
              key={navItem._key}
              href={navItem.href || "#"}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className={cn(
                buttonVariants({
                  variant: navItem.buttonVariant || "default",
                }),
                navItem.buttonVariant === "ghost" &&
                  "transition-colors hover:text-foreground/80 text-foreground/60 text-sm p-0 h-auto hover:bg-transparent",
              )}
            >
              {navItem.title}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-row gap-6 justify-center lg:mt-5 text-xs border-t pt-8">
          <div className="flex items-center gap-2 text-foreground/60">
            <span>&copy; {new Date().getFullYear()}</span>
            {settings?.copyright && (
              <span className="[&>p]:!m-0">
                <PortableTextRenderer value={settings.copyright} />
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
