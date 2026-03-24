"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({
  settings,
}: {
  settings: SETTINGS_QUERY_RESULT;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before hydration, use light theme as default
  const themeToUse = mounted ? resolvedTheme : "light";

  // Select the appropriate logo based on resolved theme (handles "system" correctly)
  const selectedLogo =
    settings?.logo?.[themeToUse === "dark" ? "dark" : "light"];

  // If no logo for the current theme, try the opposite theme as fallback
  const fallbackLogo =
    settings?.logo?.[themeToUse === "dark" ? "light" : "dark"];
  const logoToUse = selectedLogo || fallbackLogo;

  return logoToUse ? (
    <Image
      src={urlFor(logoToUse).url()}
      alt={settings.siteName || ""}
      width={
        (settings.logo?.width as number) ??
        logoToUse?.asset?.metadata?.dimensions?.width ??
        100
      }
      height={
        (settings.logo?.height as number) ??
        logoToUse?.asset?.metadata?.dimensions?.height ??
        40
      }
      title={settings.siteName || ""}
      placeholder={
        logoToUse?.asset?.metadata?.lqip &&
        logoToUse?.asset?.mimeType !== "image/svg+xml"
          ? "blur"
          : undefined
      }
      blurDataURL={logoToUse?.asset?.metadata?.lqip || undefined}
      quality={100}
      priority
    />
  ) : (
    <span className="text-lg font-semibold tracking-tighter">
      {settings?.siteName || "Logo"}
    </span>
  );
}
