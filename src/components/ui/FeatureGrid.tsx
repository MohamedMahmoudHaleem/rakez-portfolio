import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import type { FeatureItem } from "@/types/content";
import { Card } from "./Card";

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

type FeatureGridProps = {
  items: FeatureItem[];
  columns?: keyof typeof COLUMNS;
};

/** Icon + title + text grid. Used for services, strengths and any similar list — write the layout once. */
export function FeatureGrid({ items, columns = 4 }: FeatureGridProps) {
  return (
    <ul className={cn("grid gap-5", COLUMNS[columns])}>
      {items.map(({ icon, title, text }) => {
        const Icon = getIcon(icon);
        return (
          <li key={title}>
            <Card className="h-full">
              <Icon aria-hidden="true" className="mb-4 size-7 text-gold" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-soft-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver">{text}</p>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
