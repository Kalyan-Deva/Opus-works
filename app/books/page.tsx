import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BookCard } from "@/components/book-card";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Books",
  description: "Published and upcoming books.",
};

export default function BooksPage() {
  const books = getAllBooks();

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Library"
        title="Books"
        description="Long-form work — published titles and what's on the way."
      />

      {books.length === 0 ? (
        <p className="text-muted-foreground">No books yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
