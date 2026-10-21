import { cn } from "@/lib/cn";
import { RakeezMark } from "./RakeezMark";

type BrandProps = {
  name: string;
  nameAr: string;
  descriptor?: string;
  layout?: "horizontal" | "stacked";
  showArabic?: boolean;
  markSize?: number;
  className?: string;
};

/**
 * Bilingual lockup: mark + RAKEEZ + ركيز + descriptor.
 * Names come from content/site.json via getBrandNames() — never hard-coded here.
 */
export function Brand({
  name,
  nameAr,
  descriptor,
  layout = "horizontal",
  showArabic = true,
  markSize = 40,
  className,
}: BrandProps) {
  const stacked = layout === "stacked";

  return (
    <div className={cn("inline-flex items-center gap-3", stacked && "flex-col text-center", className)}>
      <RakeezMark size={markSize} decorative />
      <div className="leading-none">
        <span dir="ltr" className="block font-display font-semibold uppercase tracking-[0.22em] text-soft-white">
          {name}
        </span>
        {showArabic && (
          <span lang="ar" dir="rtl" className="mt-1 block text-sm text-champagne">
            {nameAr}
          </span>
        )}
        {descriptor && (
          <span className="mt-1.5 block text-[0.6rem] uppercase tracking-[0.24em] text-silver rtl:tracking-normal rtl:text-xs">
            {descriptor}
          </span>
        )}
      </div>
    </div>
  );
}
