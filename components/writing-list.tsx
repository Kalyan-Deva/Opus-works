"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import type { PostMeta } from "@/lib/posts";

export function WritingList({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(
    () => ["All", ...new Set(posts.map((p) => p.category))],
    [posts],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const selected = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={selected}
              className={
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors " +
                (selected
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent")
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 sm:grid-cols-2 sm:gap-5">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
