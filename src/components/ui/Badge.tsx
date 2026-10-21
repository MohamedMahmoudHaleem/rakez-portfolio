import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProjectStatus } from "@/types/content";

const TONES = {
  neutral: "border-steel text-silver",
  gold: "border-gold/50 text-champagne",
  success: "border-success/50 text-success",
  warning: "border-warning/50 text-warning",
  info: "border-info/50 text-info",
} as const;

type BadgeTone = keyof typeof TONES;

type BadgeProps = {
  tone?: BadgeTone;
  /** Optional leading dot so status is not communicated by color alone (the label carries meaning). */
  dot?: boolean;
  className?: string;
  children: ReactNode;
};

export function Badge({ tone = "neutral", dot = false, className, children }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", TONES[tone], className)}>
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const STATUS_TONE: Record<ProjectStatus, BadgeTone> = {
  launched: "success",
  in_development: "warning",
  concept: "info",
};

/** Project status badge. The translated label is passed in, keeping i18n out of the component. */
export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <Badge tone={STATUS_TONE[status]} dot>
      {label}
    </Badge>
  );
}
