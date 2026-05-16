"use client";

import type { ReactNode } from "react";
import { useCursorGlow } from "@/hooks/useCursorGlow";

export function HomepageCursorGlow({ children }: { children: ReactNode }) {
  const ref = useCursorGlow<HTMLDivElement>();
  return (
    <div ref={ref} className="cursor-glow">
      {children}
    </div>
  );
}
