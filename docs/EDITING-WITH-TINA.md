# Editing content with TinaCMS

This site uses [TinaCMS](https://tina.io) so you can write and edit content in a
Markdown editor — both **locally** and, once deployed, **online with a login**.
Content is still stored as `.mdx` files in `content/` (Tina just edits them and
commits to Git), so the fast static site is unchanged.

## What Tina edits

Three collections, matching the site's sections:

| Collection | Folder | Shows up at |
|------------|-----------------------|-------------|
| Writing    | `content/posts`       | `/writing`  |
| Books      | `content/books`       | `/books`    |
| Work       | `content/projects`    | `/work`     |

Cover images you upload go to `public/covers/`.

---

## 1. Edit locally (no setup, works now)

```bash
npm run dev
```

Then open **http://localhost:3000/admin**. You can create and edit posts,
books, and projects in the editor; saving writes the `.mdx` file directly. Great
for drafting offline.

> `npm run dev:next` runs plain Next.js without the Tina layer if you ever need it.

---

## 2. Turn on online editing with a login (deployment)

Online editing needs the site deployed and a free Tina Cloud project (this is
what provides the **login/accounts**). One-time setup:

### a. Put the project on GitHub
```bash
git init
git add .
git commit -m "Opus site"
# create an empty repo on github.com, then:
git remote add origin https://github.com/Kalyan-Deva/<repo>.git
git branch -M main
git push -u origin main
```

### b. Create the Tina Cloud project
1. Go to **https://app.tina.io** and sign in with GitHub.
2. **Create a project** → connect the GitHub repo above → branch `main`.
3. Copy the **Client ID**, and create a **Token** (Content/Read-Write).
4. Add collaborators under the project's **Users** if others should log in.

### c. Deploy on Vercel
1. Import the GitHub repo at **https://vercel.com/new**.
2. Set the **Build Command** to:
   ```
   npm run build:cms
   ```
   (this runs `tinacms build && next build`).
3. Add **Environment Variables** (from `.env.example`):
   - `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` (from Tina Cloud)
   - `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_TO_EMAIL` (for the forms)
4. Deploy, then point `kalyangopalam.com` at the Vercel project (Domains tab).

### d. Edit online
Visit **https://kalyangopalam.com/admin**, log in with your Tina Cloud account,
and edit. Each save **commits to GitHub**, which triggers a Vercel redeploy —
your change is live in about a minute.

---

## Notes

- **Markdown is preserved.** New content you write in Tina is saved as MDX.
- **Code-block highlighting meta** (e.g. `` ```ts title="x" showLineNumbers {3} ``)
  is a raw-Markdown feature. If you edit an existing article in Tina's rich-text
  editor, double-check that fenced code blocks still read correctly after saving;
  for code-heavy posts, editing the `.mdx` file directly is safest.
- **Local mode needs no keys.** The Tina env vars only matter for the deployed,
  logged-in editor.
