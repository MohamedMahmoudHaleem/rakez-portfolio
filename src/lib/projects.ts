import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/config/site";
import type { Project, ProjectFrontmatter } from "@/types/content";
import { existingAsset } from "./assets";
import { isTodo } from "./content";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readFile(slug: string, locale: Locale): Omit<Project, "isFallback"> | undefined {
  const file = path.join(PROJECTS_DIR, `${slug}.${locale}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { frontmatter: data as ProjectFrontmatter, body: content };
}

/** English files define which projects exist; other languages are optional translations. */
export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((name) => name.endsWith(".en.mdx"))
    .map((name) => name.replace(/\.en\.mdx$/, ""));
}

/** One case study in the requested language, falling back to English. */
export function getProject(locale: Locale, slug: string): Project | undefined {
  const translated = readFile(slug, locale);
  if (translated) return { ...translated, isFallback: false };
  const english = readFile(slug, "en");
  return english && { ...english, isFallback: true };
}

/**
 * All visible case studies sorted by `order`.
 * A project only appears once it has a real title and a cover image, so the site never shows empty cards.
 */
export function getProjects(locale: Locale): Project[] {
  return getProjectSlugs()
    .map((slug) => getProject(locale, slug))
    .filter((project): project is Project => Boolean(project))
    .filter(({ frontmatter }) => !isTodo(frontmatter.title) && Boolean(existingAsset(frontmatter.cover)))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
