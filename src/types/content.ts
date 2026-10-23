export type ProjectStatus = "launched" | "in_development" | "concept";

export type GalleryImage = {
  src: string;
  type: "desktop" | "mobile";
  alt: string;
};

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  summary: string;
  clientType: string;
  industry: string;
  platform: string;
  year: string;
  duration: string;
  role: string;
  team: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  liveUrl?: string;
  stack: string[];
  cover: string;
  gallery: GalleryImage[];
  testimonial?: { quote: string; author: string; position: string };
};

export type TeamMember = {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  photo: string;
  linkedin: string;
};

/** A titled item with an icon, used by services, strengths and similar grids. */
export type FeatureItem = {
  icon: string;
  title: string;
  text: string;
};

/** A team member with fields already resolved for one locale. */
export type LocalizedTeamMember = Pick<TeamMember, "id" | "photo" | "linkedin"> & {
  name: string;
  role: string;
  bio: string;
};

/** One highlight of the lead's experience, resolved for one locale. */
export type ExperienceHighlight = {
  /** Icon name from lib/icons.ts. */
  icon: string;
  title: string;
  text: string;
  tags: string[];
  /** Only set when content/experience.json allows client names to be shown. */
  clientName?: string;
};

export type Project = {
  frontmatter: ProjectFrontmatter;
  body: string;
  /** True when the requested language file is missing and English is shown instead. */
  isFallback: boolean;
};
