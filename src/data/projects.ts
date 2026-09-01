import { getCollection, type CollectionEntry } from "astro:content";

type ProjectEntry = CollectionEntry<"projects">;
export type Project = ProjectEntry["data"] & { slug: string; description: string };

function slugFromEntry(entry: ProjectEntry): string {
  return entry.id.replace(/\.(md|mdx)$/, "");
}

function descriptionFromEntry(entry: ProjectEntry): string {
  return (entry.body ?? "").trim().replace(/\s+/g, " ");
}

function byOrderThenTitle(a: Project, b: Project): number {
  return a.order - b.order || a.title.localeCompare(b.title);
}

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection("projects");
  return entries
    .map((entry: ProjectEntry) => ({
      slug: slugFromEntry(entry),
      description: descriptionFromEntry(entry),
      ...entry.data,
    }))
    .sort(byOrderThenTitle);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export function getRelated(projects: Project[], slug: string, limit = 3): Project[] {
  const current = projects.find((project) => project.slug === slug);
  if (!current) return projects.slice(0, limit);

  return projects
    .filter((project) => project.slug !== slug)
    .sort((a, b) => {
      const aScore = a.type === current.type ? -1 : 1;
      const bScore = b.type === current.type ? -1 : 1;
      return aScore - bScore || byOrderThenTitle(a, b);
    })
    .slice(0, limit);
}

export function getProjectFilters(projects: Project[]): {
  types: string[];
  categories: string[];
} {
  return {
    types: [...new Set(projects.map((project) => project.type))],
    categories: [...new Set(projects.map((project) => project.category))],
  };
}

/** Resolves a configured slug, failing the build when it does not exist. */
export function requireProject(projects: Project[], slug: string): Project {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) {
    throw new Error(`siteConfig.featured references "${slug}", but no such project exists in src/content/projects.`);
  }
  return project;
}
