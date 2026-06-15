# Book covers

Drop book cover images here, then reference them from a book's frontmatter:

```yaml
# content/books/my-book.mdx
cover: "/covers/my-book.jpg"
```

Guidelines:

- **Aspect ratio:** 2:3 (portrait). Recommended size ~800×1200px.
- **Format:** `.jpg`, `.png`, or `.webp`. Next.js optimizes and serves modern
  formats automatically.
- A remote `https://…` URL also works as `cover` (any HTTPS host is allowed in
  `next.config.mjs`).
- If `cover` is omitted, a warm gradient cover with the title is generated
  automatically — so covers are optional.
