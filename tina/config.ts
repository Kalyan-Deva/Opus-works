import { defineConfig } from "tinacms";

// Branch Tina commits to (overridden by the host's git env in production).
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const tagsField = {
  type: "string" as const,
  name: "tags",
  label: "Tags",
  list: true,
};

export default defineConfig({
  branch,
  // From Tina Cloud (https://app.tina.io). Null locally → runs in local mode.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin", // admin served at /admin/index.html
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "covers", // uploads land in public/covers
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ---------------------------------------------------------------- Writing
      {
        name: "post",
        label: "Writing (Articles & Posts)",
        path: "content/posts",
        format: "mdx",
        defaultItem: () => ({ author: "Kalyan Gopalam", category: "Security" }),
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date", required: true, ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "string", name: "category", label: "Category" },
          tagsField,
          { type: "string", name: "author", label: "Author" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      // ------------------------------------------------------------------- Books
      {
        name: "book",
        label: "Books",
        path: "content/books",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "year", label: "Year" },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["Published", "Upcoming"],
          },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          tagsField,
          { type: "string", name: "format", label: "Format", description: "e.g. Paperback · eBook" },
          { type: "string", name: "buyUrl", label: "Buy URL" },
          { type: "image", name: "cover", label: "Cover image" },
          { type: "number", name: "order", label: "Sort order" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      // ------------------------------------------------------------------ Work
      {
        name: "project",
        label: "Work / Projects",
        path: "content/projects",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "year", label: "Year" },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "summary", label: "Summary", ui: { component: "textarea" } },
          { type: "string", name: "stack", label: "Tech stack", list: true },
          tagsField,
          { type: "string", name: "liveUrl", label: "Live URL" },
          { type: "string", name: "repoUrl", label: "Repo URL" },
          { type: "boolean", name: "featured", label: "Featured on home" },
          { type: "number", name: "order", label: "Sort order" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
