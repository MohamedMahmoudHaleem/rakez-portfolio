import { ArrowRight } from "lucide-react";
import { Button, Section } from "@/components/ui";
import { routes, type Locale } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";
import type { ExperienceHighlight } from "@/types/content";
import { ExperienceCard } from "./ExperienceCard";
import { SolutionsCard } from "./SolutionsCard";

type ExperienceStripProps = {
  locale: Locale;
  dictionary: Dictionary["experience"];
  highlights: ExperienceHighlight[];
  techLabel: string;
};

/** Three highlights of the lead's experience, a closing solutions card, and a link to About. */
export function ExperienceStrip({ locale, dictionary, highlights, techLabel }: ExperienceStripProps) {
  return (
    <Section id="experience" title={dictionary.title} description={dictionary.text}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight) => (
          <li key={highlight.title}>
            <ExperienceCard highlight={highlight} techLabel={techLabel} />
          </li>
        ))}
        <li>
          <SolutionsCard title={dictionary.solutions.title} text={dictionary.solutions.text} />
        </li>
      </ul>
      <Button href={routes.about(locale)} variant="secondary" className="mt-10" icon={<ArrowRight className="size-4" />}>
        {dictionary.link}
      </Button>
    </Section>
  );
}
