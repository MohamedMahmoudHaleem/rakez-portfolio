import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * STARTER mark only — a rough interpretation of the concept, not the final logo.
 * Replace the three paths with the professionally vectorized logo when it is ready;
 * the variants and props below can stay the same.
 */
const PATHS = {
  bowl: "M17 15H58C75 15 85 25 85 40C85 51 78 58 67 62L82 79H61L39 52H57C65 52 70 48 70 41C70 34 65 30 57 30H17V15Z",
  leg: "M29 39L78 85H55L18 50L29 39Z",
  base: "M18 57L40 79H20L10 68L18 57Z",
} as const;

const VARIANTS = {
  /** Gold + silver for dark backgrounds (default). */
  color: { bowl: "fill-soft-white", base: "fill-silver" },
  /** Single color for very small sizes or on photos. */
  light: { bowl: "fill-soft-white", base: "fill-soft-white", leg: "fill-soft-white" },
  /** Single color for light backgrounds and print. */
  dark: { bowl: "fill-midnight", base: "fill-midnight", leg: "fill-midnight" },
} as const;

type RakeezMarkProps = {
  size?: number;
  variant?: keyof typeof VARIANTS;
  /** Set when the mark sits next to the written name, so screen readers don't hear it twice. */
  decorative?: boolean;
  title?: string;
  className?: string;
};

export function RakeezMark({ size = 40, variant = "color", decorative = false, title = "Rakeez", className }: RakeezMarkProps) {
  const gradientId = `rakeez-gold-${useId().replace(/:/g, "")}`;
  const fills = VARIANTS[variant];
  const legFill = "leg" in fills ? undefined : `url(#${gradientId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      focusable="false"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": title })}
    >
      {variant === "color" && (
        <defs>
          <linearGradient id={gradientId} x1="18" y1="18" x2="82" y2="84" gradientUnits="userSpaceOnUse">
            <stop style={{ stopColor: "var(--color-champagne)" }} />
            <stop offset="1" style={{ stopColor: "var(--color-gold)" }} />
          </linearGradient>
        </defs>
      )}
      <path d={PATHS.bowl} className={fills.bowl} />
      <path d={PATHS.leg} fill={legFill} className={"leg" in fills ? fills.leg : undefined} />
      <path d={PATHS.base} className={fills.base} />
    </svg>
  );
}
