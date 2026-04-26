"use client";

import { DisableDraftMode } from "@/components/disable-draft-mode";
import VisualEditing from "next-sanity/visual-editing/client-component";
import { useEffect, useState } from "react";

export function SanityDraftMode() {
  const [hydrated, setHydrated] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setIsInIframe(window.self !== window.top);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <DisableDraftMode />
      {isInIframe && <VisualEditing />}
    </>
  );
}
