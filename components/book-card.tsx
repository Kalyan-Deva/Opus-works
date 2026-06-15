import Link from "next/link";
import type { BookMeta } from "@/lib/books";
import { BookCover } from "@/components/book-cover";

export function BookCard({ book }: { book: BookMeta }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="transition-transform duration-200 group-hover:-translate-y-1">
        <BookCover book={book} />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{book.year}</span>
          {book.status === "Upcoming" && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 font-medium text-accent">
              Upcoming
            </span>
          )}
        </div>
        <h3 className="mt-1 font-display text-lg font-semibold tracking-tight group-hover:text-accent">
          {book.title}
        </h3>
        {book.subtitle && (
          <p className="text-sm text-muted-foreground">{book.subtitle}</p>
        )}
      </div>
    </Link>
  );
}
