"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { useEffect, useState } from "react";
import { AlignRight } from "lucide-react";
import { SETTINGS_QUERY_RESULT, NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import ActionLinkButton from "@/components/blocks/shared/action-link-button";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];

export default function MobileNav({
  navigation,
  settings,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
  settings: SETTINGS_QUERY_RESULT;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto">
            <Logo settings={settings} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-center space-y-3">
              {navigation[0]?.links?.map((navItem: SanityLink) => (
                <li key={navItem._key}>
                  <ActionLinkButton
                    title={navItem.title}
                    onClick={() => setOpen(false)}
                    href={navItem.href || "#"}
                    target={navItem.target}
                    action={navItem.action}
                    variant={navItem.buttonVariant || "default"}
                    className={cn(
                      navItem.buttonVariant === "ghost" &&
                        "hover:text-decoration-none hover:opacity-50 text-lg p-0 h-auto hover:bg-transparent",
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
