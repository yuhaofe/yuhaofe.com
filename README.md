# yuhaofe.com

Personal website & blog of yuhaofe — fly through the waves.

## Tech Stack

- **Next.js 16** (App Router, static export) + **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling
- **Notion** as the blog data source (`@notionhq/client` v5)
- Project pages written in **MDX** (`projects/{locale}/*.mdx`)
- Deployed as static files on **Cloudflare Pages**

## Development

```bash
npm install
npm run dev          # English (default), http://localhost:3000
npm run dev:zh-CN    # Chinese, http://localhost:3000/zh-CN
```

All scripts use `cross-env`, so they work the same on
Windows (cmd / PowerShell / Git Bash), macOS and Linux.

## Build

The site is built once per locale via the `NEXT_LOCALE` environment variable:

```bash
npm run build-all    # English -> out/, Chinese -> out/zh-CN/
npm start            # preview the export at http://localhost:3000 (/ and /zh-CN)
```

Since the site is a static export (`output: 'export'`), there is no Node
server bundle — `next start` does not apply. `npm start` runs a tiny
dependency-free static server (`scripts/serve.mjs`) that serves `out/`
exactly the way a static host would (set `PORT` to change the port).

Deploy the `out/` directory. English lives at the root, Chinese under `/zh-CN`.

## Structure

```
app/                  # App Router pages (home, projects, [project], blog, blog/[slug], about)
components/           # UI components (header, footer, wave hero, notion renderer, ...)
lib/
  i18n.ts             # bilingual texts, locale from NEXT_LOCALE
  projects.ts         # MDX frontmatter (projects/{locale}/*.mdx)
  notion.ts           # Notion data source queries (posts, blocks)
projects/             # project MDX files, one per locale
public/               # static assets
```

Blog posts are fetched from a Notion database at build time
(`NOTION_KEY`, `NOTION_DATABASE_ID` in `.env.local`), filtered by the
`public` checkbox and the `lang` property matching the build locale.
