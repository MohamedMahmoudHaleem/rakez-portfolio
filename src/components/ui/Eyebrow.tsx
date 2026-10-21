import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small label above headings. Letter spacing is applied to Latin text only — it breaks Arabic letter joining. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase text-gold tracking-[0.24em] rtl:tracking-normal rtl:text-sm", className)}>
      {children}
    </p>
  );
}
