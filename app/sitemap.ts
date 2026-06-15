import type { MetadataRoute } from "next";
import { getAllSlugs, getAllTags } from "@/lib/posts";
import { getAllBookSlugs } from "@/lib/books";
import { getAllProjectSlugs } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/writing", "/books", "/work", "/about", "/tags"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const posts = getAllSlugs().map((slug) => ({
    url: `${siteUrl}/writing/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const books = getAllBookSlugs().map((slug) => ({
    url: `${siteUrl}/books/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projects = getAllProjectSlugs().map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tags = getAllTags().map(({ tag }) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...posts, ...books, ...projects, ...tags];
}
