import { Layers } from "lucide-react";
import { Card } from "@/components/ui";

type SolutionsCardProps = { title: string; text: string };

/** Closing card of the experience strip: what all that experience adds up to for a client. */
export function SolutionsCard({ title, text }: SolutionsCardProps) {
  return (
    <Card className="relative flex h-full flex-col gap-5 overflow-hidden border-gold/50 bg-linear-to-br from-surface/80 via-surface/60 to-gold/10 md:flex-row md:items-center md:gap-8 md:p-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-gold" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -end-16 size-64 rounded-full bg-gold/10 blur-3xl" />
      <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold text-on-gold">
        <Layers aria-hidden="true" className="size-7" strokeWidth={1.75} />
      </span>
      <div className="relative">
        <h3 className="font-display text-xl font-semibold text-soft-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-silver md:text-base">{text}</p>
      </div>
    </Card>
  );
}
