import { Card, TechTags, TodoText } from "@/components/ui";
import type { Dictionary } from "@/lib/dictionary";
import type { ProjectFrontmatter } from "@/types/content";

type AtAGlanceProps = {
  project: ProjectFrontmatter;
  dictionary: Dictionary["caseStudy"];
  techLabel: string;
};

/** Sticky summary card beside the case study body. */
export function AtAGlance({ project, dictionary, techLabel }: AtAGlanceProps) {
  const rows = [
    { label: dictionary.industry, value: project.industry },
    { label: dictionary.platform, value: project.platform },
    { label: dictionary.duration, value: project.duration },
    { label: dictionary.team, value: project.team },
  ];

  return (
    <Card padding="lg" className="lg:sticky lg:top-24">
      <h2 className="font-display text-lg font-semibold text-soft-white">{dictionary.atAGlance}</h2>
      <dl className="mt-6 grid gap-5">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm text-silver">{label}</dt>
            <TodoText as="dd" value={value} className="mt-0.5 block text-soft-white" />
          </div>
        ))}
        <div>
          <dt className="mb-2 text-sm text-silver">{dictionary.stack}</dt>
          <dd>
            <TechTags items={project.stack} label={techLabel} />
          </dd>
        </div>
      </dl>
    </Card>
  );
}
