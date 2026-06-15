import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Tags" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Browse"
        title="Tags"
        description="Find writing by topic."
      />
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
            className="panel rounded-xl px-4 py-3 transition-all hover:-translate-y-0.5 hover:text-accent"
          >
            <span className="font-medium">#{tag}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              {count} {count === 1 ? "post" : "posts"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
