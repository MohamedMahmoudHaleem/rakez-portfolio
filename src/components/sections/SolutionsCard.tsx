import { Layers } from "lucide-react";
import { Card } from "@/components/ui";

type SolutionsCardProps = { title: string; text: string };

/** Closing card of the experience strip: what all that experience adds up to for a client. */
export function SolutionsCard({ title, text }: SolutionsCardProps) {
  return (
    <Card className="relative flex h-full flex-col gap-4 overflow-hidden border-gold/50">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-gold" />
      <Layers aria-hidden="true" className="size-7 text-gold" strokeWidth={1.5} />
      <h3 className="font-display text-lg font-semibold text-soft-white">{title}</h3>
      <p className="text-sm leading-relaxed text-silver">{text}</p>
    </Card>
  );
}
