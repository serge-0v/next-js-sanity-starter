import { cn } from "@/lib/utils";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import ActionLinkButton from "@/components/blocks/shared/action-link-button";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];

export default function DesktopNav({
  navigation,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
}) {
  return (
    <div className="hidden xl:flex items-center gap-7 text-primary">
      {navigation[0]?.links?.map((navItem: SanityLink) => (
        <ActionLinkButton
          key={navItem._key}
          title={navItem.title}
          href={navItem.href || "#"}
          target={navItem.target}
          action={navItem.action}
          variant={navItem.buttonVariant || "default"}
          className={cn(
            navItem.buttonVariant === "ghost" &&
              "transition-colors hover:text-foreground/80 text-foreground/60 text-sm p-0 h-auto hover:bg-transparent",
          )}
        />
      ))}
    </div>
  );
}
