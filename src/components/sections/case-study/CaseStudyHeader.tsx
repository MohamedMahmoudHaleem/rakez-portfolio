import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button, Heading, StatusBadge, TodoText } from "@/components/ui";
import { routes, type Locale } from "@/config/site";
import { realOrUndefined } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionary";
import type { ProjectFrontmatter } from "@/types/content";

type CaseStudyHeaderProps = {
  locale: Locale;
  project: ProjectFrontmatter;
  dictionary: Dictionary;
};

/** Breadcrumb, title and the key facts shown above the cover. */
export function CaseStudyHeader({ locale, project, dictionary }: CaseStudyHeaderProps) {
  const { caseStudy, ui, nav } = dictionary;
  // Only full URLs for now: internal links like /concepts/real-estate point at the optional demo, which isn't built yet.
  const liveUrl = realOrUndefined(project.liveUrl)?.startsWith("http") ? project.liveUrl : undefined;
  const crumbs = [
    { href: routes.home(locale), label: ui.home },
    { href: routes.work(locale), label: nav.work },
  ];
  const facts = [
    { label: caseStudy.client, value: project.clientType },
    { label: caseStudy.year, value: project.year },
    { label: caseStudy.role, value: project.role },
  ];

  return (
    <header>
      <nav aria-label={ui.breadcrumb}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-silver">
          {crumbs.map(({ href, label }) => (
            <li key={href} className="flex items-center gap-1.5">
              <Link href={href} className="hover:text-soft-white">{label}</Link>
              <ChevronRight aria-hidden="true" className="size-3.5 rtl:-scale-x-100" />
            </li>
          ))}
          <li aria-current="page" className="text-soft-white"><TodoText value={project.title} /></li>
        </ol>
      </nav>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} label={dictionary.work.status[project.status]} />
      </div>
      <Heading as="h1" size="xl" className="mt-4 max-w-3xl">
        <TodoText value={project.title} />
      </Heading>
      <TodoText as="p" value={project.summary} className="mt-4 block max-w-2xl text-lg text-silver" />

      <dl className="mt-8 grid gap-6 border-y border-steel/60 py-6 sm:grid-cols-3">
        {facts.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-gold rtl:tracking-normal">{label}</dt>
            <TodoText as="dd" value={value} className="mt-1.5 block text-soft-white" />
          </div>
        ))}
      </dl>

      {liveUrl && (
        <Button href={liveUrl} external className="mt-8" icon={<ExternalLink className="size-4" />}>
          {caseStudy.visit}
        </Button>
      )}
    </header>
  );
}
