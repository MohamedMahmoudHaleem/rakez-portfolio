import { Badge, Card } from "@/components/ui";
// import { TechTags } from "@/components/ui"; // tech tags hidden for now
import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";

/** One highlight of the team's experience — text only, no screenshots of employer work. */
type ExperienceCardProps = {
  highlight: {
    icon: string;
    title: string;
    text: string;
    clientName?: string;
    /** Product names shown as gold chips (used by the fintech card). */
    products?: string[];
  };
  /** Position in the list, shown as a large faint number. */
  index?: number;
  /** Highlighted style for the card we want to stand out. */
  featured?: boolean;
  /** Label for the tech tags — unused while they are hidden, kept so they can come back. */
  techLabel: string;
};

export function ExperienceCard({ highlight, index, featured = false }: ExperienceCardProps) {
  const Icon = getIcon(highlight.icon);

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col gap-5 overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-gold/50",
        featured && "border-gold/40 bg-linear-to-br from-gold/10 via-surface/60 to-surface/60",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-gold transition-opacity duration-300",
          featured ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        {index !== undefined && (
          <span aria-hidden="true" className="font-display text-3xl font-semibold text-steel transition-colors group-hover:text-gold/40">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-soft-white">{highlight.title}</h3>
        {highlight.clientName && <p className="mt-1 text-sm text-champagne">{highlight.clientName}</p>}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-silver">{highlight.text}</p>
      {highlight.products && highlight.products.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {highlight.products.map((product) => (
            <li key={product}>
              <Badge tone="gold">{product}</Badge>
            </li>
          ))}
        </ul>
      )}
      {/* Tech tags hidden for now.
      <TechTags items={highlight.tags} label={techLabel} />
      */}
    </Card>
  );
}
