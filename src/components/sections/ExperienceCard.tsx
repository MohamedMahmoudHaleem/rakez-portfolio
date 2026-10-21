import { Card } from "@/components/ui";
// import { TechTags } from "@/components/ui"; // tech tags hidden for now
import type { ExperienceHighlight } from "@/types/content";

/** One highlight of the lead's experience — text only, no screenshots of employer work. */
type ExperienceCardProps = {
  highlight: ExperienceHighlight;
  /** Label for the tech tags — unused while they are hidden, kept so they can come back. */
  techLabel: string;
};

export function ExperienceCard({ highlight }: ExperienceCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-soft-white">{highlight.title}</h3>
        {highlight.clientName && <p className="mt-1 text-sm text-champagne">{highlight.clientName}</p>}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-silver">{highlight.text}</p>
      {/* Tech tags hidden for now.
      <TechTags items={highlight.tags} label={techLabel} />
      */}
    </Card>
  );
}
