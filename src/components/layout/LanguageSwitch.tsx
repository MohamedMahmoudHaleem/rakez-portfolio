"use client";

import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, type Locale } from "@/config/site";
import { cn } from "@/lib/cn";

type LanguageSwitchProps = {
  locale: Locale;
  /** The other language's name, written in that language (e.g. "عربي"). */
  label: string;
  className?: string;
};

/** Links to the same page in the other language. */
export function LanguageSwitch({ locale, label, className }: LanguageSwitchProps) {
  const pathname = usePathname();
  const target: Locale = locale === "en" ? "ar" : "en";
  const [, first, ...rest] = pathname.split("/");
  const path = isLocale(first ?? "") ? rest.join("/") : [first, ...rest].join("/");

  return (
    <Link
      href={`/${target}${path ? `/${path}` : ""}`}
      hrefLang={target}
      lang={target}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-silver transition hover:text-soft-white",
        className,
      )}
    >
      <Languages aria-hidden="true" className="size-4" />
      {label}
    </Link>
  );
}
