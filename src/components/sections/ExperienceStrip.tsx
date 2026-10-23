// import { ArrowRight } from "lucide-react"; // "More about us" button hidden for now
import { Section } from "@/components/ui";
// import { Button } from "@/components/ui";
// import { routes } from "@/config/site";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";
import type { ExperienceHighlight } from "@/types/content";
import { ExperienceCard } from "./ExperienceCard";
import { SolutionsCard } from "./SolutionsCard";

type ExperienceStripProps = {
  /** Unused while the About link is hidden, kept so it can come back. */
  locale: Locale;
  dictionary: Dictionary["experience"];
  highlights: ExperienceHighlight[];
  /** The team's fintech experience, shown as a highlighted card after the lead's highlights. */
  fintech: Dictionary["experience"]["fintech"];
  techLabel: string;
};

/** Highlights of the team's experience, a fintech card and a closing solutions card. */
export function ExperienceStrip({ dictionary, highlights, fintech, techLabel }: ExperienceStripProps) {
  return (
    <Section id="experience" title={dictionary.title} description={dictionary.text}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight, i) => (
          <li key={highlight.title}>
            <ExperienceCard highlight={highlight} index={i + 1} techLabel={techLabel} />
          </li>
        ))}
        <li>
          <ExperienceCard
            highlight={{ icon: "WalletCards", title: fintech.title, text: fintech.text, products: fintech.tags }}
            index={highlights.length + 1}
            featured
            techLabel={techLabel}
          />
        </li>
        <li className="md:col-span-2">
          <SolutionsCard title={dictionary.solutions.title} text={dictionary.solutions.text} />
        </li>
      </ul>
      {/* "More about us" button hidden for now.
      <Button href={routes.about(locale)} variant="secondary" className="mt-10" icon={<ArrowRight className="size-4" />}>
        {dictionary.link}
      </Button>
      */}
    </Section>
  );
}
