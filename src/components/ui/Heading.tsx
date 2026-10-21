import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const SIZES = {
  display: "text-4xl leading-tight md:text-6xl",
  xl: "text-3xl leading-tight md:text-5xl",
  lg: "text-2xl leading-snug md:text-4xl",
  md: "text-xl leading-snug md:text-2xl",
  sm: "text-lg leading-snug",
} as const;

type HeadingProps = {
  /** The semantic level. Keep the page outline correct: one h1 per page. */
  as?: "h1" | "h2" | "h3" | "h4";
  /** The visual size, independent from the semantic level. */
  size?: keyof typeof SIZES;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Heading({ as: Tag = "h2", size = "lg", id, className, children }: HeadingProps) {
  return (
    <Tag id={id} className={cn("font-display font-semibold tracking-tight text-soft-white", SIZES[size], className)}>
      {children}
    </Tag>
  );
}
