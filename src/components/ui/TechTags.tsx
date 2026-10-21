import { Badge } from "./Badge";

/** A wrapped row of technology chips. `limit` keeps cards tidy. */
type TechTagsProps = {
  items: string[];
  limit?: number;
  /** Translated list label for screen readers. */
  label: string;
};

export function TechTags({ items, limit, label }: TechTagsProps) {
  const visible = limit ? items.slice(0, limit) : items;

  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {visible.map((item) => (
        <li key={item}>
          <Badge>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
