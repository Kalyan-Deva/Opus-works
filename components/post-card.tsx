import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group flex flex-col border-b border-border py-6 transition-colors first:pt-0 hover:bg-muted/40 sm:rounded-2xl sm:border sm:p-6 sm:hover:-translate-y-0.5 sm:hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium uppercase tracking-wide text-accent">
          {post.category}
        </span>
        <span aria-hidden>·</span>
        <span>{formatDate(post.date)}</span>
        <span className="ml-auto flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {post.readingMinutes} min
        </span>
      </div>

      <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-accent">
        {post.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
