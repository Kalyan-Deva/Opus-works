import Image from "next/image";
import type { BookMeta } from "@/lib/books";

// Deterministic warm gradient based on the slug, so each generated cover is
// stable across renders but visually distinct.
const GRADIENTS = [
  "linear-gradient(150deg, #C2540C, #7C2D12)",
  "linear-gradient(150deg, #B45309, #422006)",
  "linear-gradient(150deg, #9A3412, #431407)",
  "linear-gradient(150deg, #A16207, #3F2D0A)",
  "linear-gradient(150deg, #1A1815, #4B4540)",
];

function pick(slug: string) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export function BookCover({
  book,
  priority = false,
  sizes = "(min-width: 1024px) 16rem, (min-width: 640px) 22vw, 45vw",
  className = "",
}: {
  book: Pick<BookMeta, "slug" | "title" | "cover">;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md ring-1 ring-black/10 ${className}`}
      style={book.cover ? undefined : { backgroundImage: pick(book.slug) }}
    >
      {book.cover ? (
        <Image
          src={book.cover}
          alt={`Cover of ${book.title}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <span className="absolute inset-y-0 left-0 w-1.5 bg-black/20" />
          <span className="absolute inset-0 flex items-center p-5">
            <span className="font-display text-lg font-semibold leading-snug text-white drop-shadow-sm">
              {book.title}
            </span>
          </span>
        </>
      )}
    </div>
  );
}
