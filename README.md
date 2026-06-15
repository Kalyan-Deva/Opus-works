# Opus — a personal creator platform

**Opus** is a full-stack personal site that brings everything you make into one
fast, premium home: your **writing** (essays + articles), your **books**, and
your **work** (portfolio). Built with Next.js (App Router); all content is
file-based MDX, so there's no database to run.

## Features

- **Writing** — blog posts and long-form articles from MDX, with category
  filtering, tags, reading time, and server-side syntax highlighting (Shiki).
- **Books** — a showcase library with generated covers, "Published / Upcoming"
  status, and optional buy links.
- **Work** — portfolio case studies (Problem / Approach / Outcome) with stack,
  live/repo links.
- **About + Contact** — bio page with a working contact form.
- **Newsletter** — signup form in the footer.
- **Search** — instant `⌘K` / `Ctrl+K` search across all writing.
- **Dark / light mode** — warm, sunlit editorial design in both themes.
- **Design** — Fraunces (display serif) + Inter (UI), warm paper + amber accent.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statically pre-renders every page
npm start        # serve the production build
```

## Adding content

All content lives in `content/` as `.mdx` files. The file name is the URL slug.

### A writing post — `content/posts/<slug>.mdx`

```mdx
---
title: "My Article"
date: "2026-06-14"
excerpt: "One-line summary."
category: "Engineering"
tags: ["Next.js", "MDX"]
author: "Your Name"
---

Markdown / MDX body…
```

### A book — `content/books/<slug>.mdx`

```mdx
---
title: "My Book"
subtitle: "An optional subtitle"
year: "2026"
status: "Published"   # or "Upcoming"
description: "Used for previews/SEO."
tags: ["Topic"]
format: "Paperback · eBook"
buyUrl: "https://…"   # optional; shows a "Get the book" button
order: 1
---

About the book…
```

Covers are generated automatically from a warm gradient. To use a real cover,
add `cover: "/covers/my-book.jpg"` (place the image in `public/covers/`).

### A project — `content/projects/<slug>.mdx`

```mdx
---
title: "Project"
year: "2026"
role: "Design & Engineering"
summary: "One-line summary for cards."
stack: ["Next.js", "TypeScript"]
tags: ["Web"]
liveUrl: "https://…"   # optional
repoUrl: "https://…"   # optional
featured: true          # surfaces on the home page
order: 1
---

## Problem
## Approach
## Outcome
```

### Code blocks

Fenced blocks support `rehype-pretty-code` meta:

````md
```ts title="example.ts" showLineNumbers {3}
// title= caption · showLineNumbers · {3} or {1,4-6} to highlight lines
```
````

## Branding

Your name and links live in one place — [`lib/site.ts`](lib/site.ts). Edit
`author`, `email`, `url`, and `socials` there and the navbar, footer, page
titles, and About copy all update. The site is branded **"Opus by K. Gopalam"**.

## Forms & email (Resend)

`/api/contact` and `/api/newsletter` are wired to [Resend](https://resend.com)
via [`lib/email.ts`](lib/email.ts), but **gated on environment variables**:

- **No key set** → the forms run in safe *stub mode* (validate + return success,
  send nothing). Great for local dev.
- **Key set** → contact messages are emailed to you, and newsletter signups are
  added to a Resend Audience (or emailed to you if no audience is configured).

To go live, copy `.env.example` to `.env.local` and fill in:

```bash
RESEND_API_KEY=...          # from resend.com/api-keys
EMAIL_FROM="Opus <hello@yourdomain.com>"   # a verified sender
CONTACT_TO_EMAIL=you@yourdomain.com
RESEND_AUDIENCE_ID=...      # optional, for newsletter
```

## Project structure

```
app/
  page.tsx                 # home: hero + featured writing/books/work
  writing/                 # writing index + [slug] post pages
  books/                   # books index + [slug] detail
  work/                    # portfolio index + [slug] case study
  about/                   # bio + contact form
  tags/                    # tag index + [tag] pages
  api/{contact,newsletter} # form endpoints
  globals.css              # design tokens, utilities, code styles
components/                # navbar, footer, cards, forms, search, mdx, …
lib/
  posts.ts | books.ts | projects.ts   # content loaders (frontmatter)
  site.ts                              # name / author / links (edit me)
  email.ts                             # Resend integration (env-gated)
  format.ts                            # client-safe helpers
content/
  posts/ | books/ | projects/          # your MDX content
public/covers/                         # book cover images (optional)
```

## Tech

Next.js 15 · React 19 · Tailwind CSS v4 · next-mdx-remote · Shiki · next-themes
· Resend · Fraunces + Inter · lucide-react

> Note: the books and projects currently in `content/` are sample placeholders —
> replace them with your own.
