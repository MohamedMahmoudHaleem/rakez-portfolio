import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary: "bg-gradient-gold text-on-gold hover:brightness-110",
  secondary: "border border-steel text-soft-white hover:border-champagne hover:text-champagne",
  ghost: "text-silver hover:text-soft-white",
} as const;

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition " +
  "disabled:pointer-events-none disabled:opacity-50";

type StyleProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Icon shown after the label. Directional icons (arrows) are mirrored automatically in RTL. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsButton = StyleProps & Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps>;
type AsLink = StyleProps & { href: string; external?: boolean };

// mailto:/tel: links open an app, so they need a plain <a> without a new tab.
const APP_LINK = /^(mailto|tel):/;

export type ButtonProps = AsButton | AsLink;

/** Exposed so other elements (e.g. a form submit inside a library component) can share the exact styles. */
export function buttonClasses({ variant = "primary", size = "md", className }: Pick<StyleProps, "variant" | "size" | "className">) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

/** One component for buttons and button-styled links, so every CTA looks identical. */
export function Button({ variant, size, icon, className, children, ...rest }: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="rtl:-scale-x-100" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  if ("href" in rest) {
    const { href, external } = rest;
    if (APP_LINK.test(href)) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      );
    }
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
