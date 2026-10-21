// import { ArrowUpRight } from "lucide-react"; // case study links off for now
// import Link from "next/link";
import { Card, SmartImage, StatusBadge, TechTags, TodoText } from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectCardProps = {
  project: Pick<ProjectFrontmatter, "title" | "summary" | "status" | "stack">;
  /** Case study URL — unused while case study pages are off, kept so links can come back. */
  href: string;
  /** Resolved cover path, or undefined while the screenshot is missing. */
  coverSrc?: string;
  statusLabel: string;
  techLabel: string;
};

/** Project preview: cover, status, title, summary and stack. Not clickable for now. */
export function ProjectCard({ project, coverSrc, statusLabel, techLabel }: ProjectCardProps) {
  return (
    <Card padding="none" className="group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden border-b border-steel/60">
        <SmartImage
          src={coverSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          fallbackLabel={siteConfig.studioName}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <StatusBadge status={project.status} label={statusLabel} />
        </div>
        <h3 className="font-display text-xl font-semibold text-soft-white">
          {/* Case study pages are off for now — cards are informational only.
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            <TodoText value={project.title} />
          </Link>
          */}
          <TodoText value={project.title} />
        </h3>
        <TodoText as="p" value={project.summary} className="flex-1 text-sm leading-relaxed text-silver" />
        <div className="flex items-end justify-between gap-3">
          <TechTags items={project.stack} limit={3} label={techLabel} />
          {/* <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-gold transition group-hover:-translate-y-0.5 rtl:-scale-x-100" /> */}
        </div>
      </div>
    </Card>
  );
}
