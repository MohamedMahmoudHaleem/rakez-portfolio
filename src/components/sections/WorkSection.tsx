import { ArrowRight } from "lucide-react";
import { Button, Section } from "@/components/ui";
import { routes, type Locale } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";
import type { Project } from "@/types/content";
import { ProjectCard } from "./ProjectCard";

type WorkSectionProps = {
  locale: Locale;
  dictionary: Dictionary["work"];
  techLabel: string;
  projects: Project[];
  /** Cover paths that exist, keyed by slug. */
  covers: Record<string, string | undefined>;
  /** Page title mode for /work; on the home page it is a regular section with a "view all" link. */
  asPage?: boolean;
};

/** Grid of case study cards, used on the home page and as the /work page. */
export function WorkSection({ locale, dictionary, techLabel, projects, covers, asPage = false }: WorkSectionProps) {
  return (
    <Section id="work" title={dictionary.title} description={dictionary.subtitle} headingAs={asPage ? "h1" : "h2"}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ frontmatter }) => (
          <li key={frontmatter.slug}>
            <ProjectCard
              project={frontmatter}
              href={routes.project(locale, frontmatter.slug)}
              coverSrc={covers[frontmatter.slug]}
              statusLabel={dictionary.status[frontmatter.status]}
              techLabel={techLabel}
            />
          </li>
        ))}
      </ul>
      {!asPage && (
        <Button href={routes.work(locale)} variant="secondary" className="mt-10" icon={<ArrowRight className="size-4" />}>
          {dictionary.viewAll}
        </Button>
      )}
    </Section>
  );
}
