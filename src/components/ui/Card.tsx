import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  /** Adds hover feedback for cards that are links or open something. */
  interactive?: boolean;
  padding?: "none" | "md" | "lg";
};

const PADDING = { none: "", md: "p-6", lg: "p-8" } as const;

export function Card({ interactive = false, padding = "md", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-steel/60 bg-surface/60 shadow-card",
        PADDING[padding],
        interactive && "transition hover:-translate-y-0.5 hover:border-gold/60",
        className,
      )}
      {...props}
    />
  );
}
