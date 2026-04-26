"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/menu-toggle";

export function ModeToggleClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ModeToggle />;
}
