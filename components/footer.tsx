import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS } from "@/components/nav-links";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/lib/site";

const SOCIALS = [
  { href: site.socials.github, label: "GitHub", Icon: Github },
  { href: site.socials.twitter, label: "Twitter", Icon: Twitter },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Newsletter */}
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Stay in the loop
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              New essays, book releases, and project write-ups — occasionally,
              never spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6 md:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            <span className="font-display font-semibold text-foreground">
              {site.name}
            </span>{" "}
            by {site.author}
          </p>
          <p>© {new Date().getFullYear()} · Built with Next.js & MDX</p>
        </div>
      </div>
    </footer>
  );
}
