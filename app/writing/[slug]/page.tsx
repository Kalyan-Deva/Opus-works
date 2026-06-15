import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import { formatDate, getAllSlugs, getPost } from "@/lib/posts";
import { Mdx } from "@/components/mdx";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <article className="container-page py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/writing"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium uppercase tracking-wide text-accent">
              {post.category}
            </span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingMinutes} min read
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          {post.author && (
            <p className="mt-4 text-sm text-muted-foreground">
              By {post.author}
            </p>
          )}
        </header>

        <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent prose-a:underline-offset-2 prose-pre:p-0">
          <Mdx source={post.content} />
        </div>

        <footer className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              #{tag}
            </Link>
          ))}
        </footer>
      </div>
    </article>
  );
}
