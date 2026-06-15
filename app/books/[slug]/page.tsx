import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { getAllBookSlugs, getBook } from "@/lib/books";
import { BookCover } from "@/components/book-cover";
import { Mdx } from "@/components/mdx";

export function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const book = getBook(slug);
    return { title: book.title, description: book.description };
  } catch {
    return {};
  }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let book;
  try {
    book = getBook(slug);
  } catch {
    notFound();
  }

  return (
    <div className="container-page py-12">
      <Link
        href="/books"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All books
      </Link>

      <div className="grid gap-10 md:grid-cols-[16rem_1fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="mx-auto max-w-[16rem]">
            <BookCover book={book} priority sizes="16rem" />
            {book.buyUrl && (
              <a
                href={book.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Get the book <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{book.year}</span>
            <span aria-hidden>·</span>
            <span>{book.status}</span>
            {book.format && (
              <>
                <span aria-hidden>·</span>
                <span>{book.format}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="mt-3 text-xl text-muted-foreground">
              {book.subtitle}
            </p>
          )}

          <div className="prose prose-stone mt-8 max-w-none dark:prose-invert prose-headings:font-display prose-a:text-accent">
            <Mdx source={book.content} />
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
