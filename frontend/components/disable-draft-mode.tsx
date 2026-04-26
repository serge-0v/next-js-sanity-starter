"use client";

import { useEffect, useState, useTransition } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { disableDraftMode } from "@/app/actions/disable-draft-mode";

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Hide inside Presentation Tool and other Studio iframe panes.
  if (isInIframe) return null;

  return (
    <button
      className={cn(
        buttonVariants({ size: "lg" }),
        "fixed z-9999 bottom-4 right-4 cursor-pointer",
      )}
      disabled={pending}
      onClick={() => startTransition(() => disableDraftMode())}
    >
      {pending ? "Disabling..." : "Disable Draft Mode"}
    </button>
  );
}
