import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectFrontmatter {
  title: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  cover?: string;
  featured?: boolean;
  order?: number;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

export interface Project extends ProjectMeta {
  content: string;
}

function readProject(slug: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<ProjectFrontmatter>;
  return {
    slug,
    title: fm.title ?? slug,
    year: fm.year ?? "",
    role: fm.role ?? "",
    summary: fm.summary ?? "",
    stack: fm.stack ?? [],
    tags: fm.tags ?? [],
    liveUrl: fm.liveUrl,
    repoUrl: fm.repoUrl,
    cover: fm.cover,
    featured: fm.featured ?? false,
    order: fm.order ?? 0,
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): Project {
  return readProject(slug);
}

export function getAllProjects(): ProjectMeta[] {
  return getAllProjectSlugs()
    .map((slug) => {
      const { content, ...meta } = readProject(slug);
      void content;
      return meta;
    })
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || b.year.localeCompare(a.year),
    );
}
