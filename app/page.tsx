import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { getAllBooks } from "@/lib/books";
import { getAllProjects } from "@/lib/projects";
import { PostCard } from "@/components/post-card";
import { BookCard } from "@/components/book-card";
import { ProjectCard } from "@/components/project-card";

function SectionHeading({
  title,
  href,
  cta,
}: {
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent transition-colors hover:opacity-80"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function Home() {
  const posts = getAllPosts();
  const books = getAllBooks();
  const projects = getAllProjects();

  const featuredPosts = posts.slice(0, 4);
  const featuredBooks = books.slice(0, 4);
  const featuredProjects = projects
    .filter((p) => p.featured)
    .concat(projects.filter((p) => !p.featured))
    .slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Writer · Engineer · Maker
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Everything I make,
            <br />
            <span className="text-accent">in one place.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Essays and articles, published books, and selected work — a single,
            quiet home for the writing and the building.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Read the writing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View the work
            </Link>
          </div>
        </div>
      </section>

      {/* Featured writing */}
      {featuredPosts.length > 0 && (
        <section className="container-page py-12">
          <SectionHeading
            title="Latest writing"
            href="/writing"
            cta="All writing"
          />
          <div className="grid gap-0 sm:grid-cols-2 sm:gap-5">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Books */}
      {featuredBooks.length > 0 && (
        <section className="container-page py-12">
          <SectionHeading title="Books" href="/books" cta="All books" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {featuredBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Work */}
      {featuredProjects.length > 0 && (
        <section className="container-page py-12">
          <SectionHeading title="Selected work" href="/work" cta="All work" />
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
