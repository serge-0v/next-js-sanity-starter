"use client";

import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { stegaClean } from "next-sanity";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DR_FLEX_ACTION,
  getDrFlexScriptUrl,
  isDrFlexEnabled,
} from "@/lib/dr-flex";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

interface ActionLinkButtonProps {
  title?: string | null;
  href?: string | null;
  target?: boolean | null;
  action?: string | null;
  variant?: ButtonVariant | null;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
}

function getSafeHref(href?: string | null) {
  return href || "#";
}

export default function ActionLinkButton({
  title,
  href,
  target,
  action,
  variant,
  size,
  className,
  onClick,
}: ActionLinkButtonProps) {
  const cleanAction = action ? stegaClean(action) : action;
  const isDrFlexAction = cleanAction === DR_FLEX_ACTION;
  const isFeatureActive = isDrFlexEnabled() && Boolean(getDrFlexScriptUrl());

  if (isDrFlexAction && isFeatureActive) {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant: variant ?? undefined, size }), className)}
        onClick={() => {
          window.toggleDrFlexAppointments?.();
          onClick?.();
        }}
      >
        {title}
      </button>
    );
  }

  return (
    <Button variant={variant ?? undefined} size={size} className={className} asChild>
      <Link
        href={getSafeHref(href)}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {title}
      </Link>
    </Button>
  );
}
