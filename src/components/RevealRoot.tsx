"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

export function RevealRoot({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref}>{children}</div>;
}
