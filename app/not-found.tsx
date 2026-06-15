import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-7xl font-semibold tracking-tight text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          Page not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
