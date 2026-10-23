import { ArrowRight } from "lucide-react";
import { Button, Section } from "@/components/ui";
import { routes, type Locale } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";
import type { Project } from "@/types/content";
import type { TrackRecordItem } from "@/lib/track-record";
import { ProjectCard } from "./ProjectCard";
import { TrackRecord } from "./TrackRecord";

type WorkSectionProps = {
  locale: Locale;
  dictionary: Dictionary["work"];
  techLabel: string;
  projects: Project[];
  /** Cover paths that exist, keyed by slug. */
  covers: Record<string, string | undefined>;
  /** Page title mode for /work; on the home page it is a regular section with a "view all" link. */
  asPage?: boolean;
  /** Products the team helped build in earlier roles; shown under the projects when given. */
  trackRecord?: TrackRecordItem[];
};

/** Grid of case study cards, used on the home page and as the /work page. */
export function WorkSection({ locale, dictionary, techLabel, projects, covers, asPage = false, trackRecord }: WorkSectionProps) {
  return (
    <Section id="work" title={dictionary.title} description={dictionary.subtitle} headingAs={asPage ? "h1" : "h2"}>
      <ul className={cn("grid gap-6 md:grid-cols-2", projects.length >= 3 && "lg:grid-cols-3")}>
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
      {trackRecord && trackRecord.length > 0 && <TrackRecord dictionary={dictionary.trackRecord} items={trackRecord} />}
      {!asPage && (
        <Button href={routes.work(locale)} variant="secondary" className="mt-10" icon={<ArrowRight className="size-4" />}>
          {dictionary.viewAll}
        </Button>
      )}
    </Section>
  );
}
