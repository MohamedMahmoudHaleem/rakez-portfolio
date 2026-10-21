import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const WIDTHS = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: keyof typeof WIDTHS;
};

/** Centers content and applies the standard horizontal padding. */
export function Container({ width = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 md:px-8", WIDTHS[width], className)} {...props} />;
}
