import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BOOKS_DIR = path.join(process.cwd(), "content", "books");

export interface BookFrontmatter {
  title: string;
  subtitle?: string;
  year: string;
  status: "Published" | "Upcoming";
  description: string;
  tags: string[];
  cover?: string; // optional image URL; falls back to a generated cover
  buyUrl?: string;
  format?: string; // e.g. "Paperback · eBook"
  order?: number;
}

export interface BookMeta extends BookFrontmatter {
  slug: string;
}

export interface Book extends BookMeta {
  content: string;
}

function readBook(slug: string): Book {
  const raw = fs.readFileSync(path.join(BOOKS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<BookFrontmatter>;
  return {
    slug,
    title: fm.title ?? slug,
    subtitle: fm.subtitle,
    year: fm.year ?? "",
    status: fm.status ?? "Published",
    description: fm.description ?? "",
    tags: fm.tags ?? [],
    cover: fm.cover,
    buyUrl: fm.buyUrl,
    format: fm.format,
    order: fm.order ?? 0,
    content,
  };
}

export function getAllBookSlugs(): string[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];
  return fs
    .readdirSync(BOOKS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBook(slug: string): Book {
  return readBook(slug);
}

export function getAllBooks(): BookMeta[] {
  return getAllBookSlugs()
    .map((slug) => {
      const { content, ...meta } = readBook(slug);
      void content;
      return meta;
    })
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || b.year.localeCompare(a.year),
    );
}
