# Starzecki Research

An independent, educational equity-research website with a transparent paper long/short
portfolio. Built to be fast, clean, and almost entirely automatic — your only ongoing job is to
**write a report → export it to PDF → publish the model to Google Sheets → add one short entry → it's
live.**

This README is written for a beginner. If a step looks unfamiliar, follow it exactly; nothing here
can break your computer.

---

## What it does

- **Research** — every report is a PDF you upload, shown on its own page with title/ticker/rating
  metadata, an embedded PDF viewer, a download button, and an "Open the model (Google Sheets) →"
  button.
- **Portfolio** — a paper $100MM long/short book with positions and performance, benchmarked
  against the S&P 500, fed from a simple data file (and optionally a linked live Google Sheet).
- **About, Methodology, Disclaimer** — the story, the house format, and the not-advice framing.
- **Automatic everything else** — the homepage, the research index, sorting/filtering, the RSS feed,
  the sitemap, and social-share previews are all generated for you. The site rebuilds and redeploys
  itself every time you push a change.

---

## The tech, in one breath

- **[Astro](https://astro.build)** turns your files into a fast, static website.
- **[Tailwind CSS](https://tailwindcss.com)** styles it.
- **Content collections** = your reports live as small text files; Astro builds the pages from them.
- **GitHub** stores the project; **Cloudflare Pages** hosts it and rebuilds on every push.

You do **not** need to understand any of this to publish. See [PUBLISHING.md](./PUBLISHING.md).

---

## Folder map (what lives where)

```
starzecki-research/
├─ public/                  Files served as-is (never processed)
│  ├─ reports/              ← YOUR REPORT PDFs GO HERE
│  ├─ admin/                Optional Decap CMS (form-based publisher) at /admin
│  ├─ favicon.svg           The little "SR" browser-tab icon
│  └─ og-default.png        The image shown when a link is shared on LinkedIn
├─ src/
│  ├─ content/reports/      ← ONE SMALL TEXT FILE PER REPORT
│  ├─ data/
│  │  ├─ site.ts            Your name, email, LinkedIn, nav, live-tracker link
│  │  └─ portfolio.json     ← YOUR POSITIONS + NAV-vs-S&P HISTORY
│  ├─ components/           Reusable building blocks (header, footer, cards, chart…)
│  ├─ layouts/              The page frame (head tags + header + footer)
│  ├─ pages/                One file = one URL (home, research, portfolio, about…)
│  ├─ lib/                  Small helpers (formatting, portfolio math)
│  ├─ styles/global.css     ← ALL COLORS AND FONTS (change them in one place)
│  └─ content.config.ts     The list of fields every report must have
├─ scripts/
│  ├─ new-report.mjs        `npm run new-report` — interactive report creator
│  ├─ make-sample-pdfs.mjs  Regenerates the placeholder sample PDFs
│  └─ make-og.mjs           Regenerates the social-share image
├─ astro.config.mjs         Site URL + integrations
├─ README.md                You are here
└─ PUBLISHING.md            The plain-English "how to publish" guide
```

The three places you'll ever touch: **`public/reports/`**, **`src/content/reports/`**, and
**`src/data/portfolio.json`**. Plus **`src/data/site.ts`** once, to put in your real links.

---

## Run it on your computer (local preview)

You need **Node.js v20 or newer** (this project was built on v24). Check with `node --version`. If
that command isn't found, install the "LTS" version from <https://nodejs.org> and reopen your
terminal.

From this folder:

```bash
npm install      # first time only — downloads the building blocks
npm run dev      # starts a local preview
```

Then open the URL it prints (usually **http://localhost:4321**) in your browser. The preview updates
itself as you save files. To stop it, run `npm run astro -- dev stop` (or just close the terminal).

> **Windows note:** if `node`/`npm` are "not recognized" right after installing Node, close and
> reopen your terminal so it picks up the new program.

---

## Make it yours (quick customizations)

| I want to change…                         | Edit this file                          |
| ----------------------------------------- | --------------------------------------- |
| Your name, email, LinkedIn, nav links     | `src/data/site.ts`                      |
| The live Google Sheet tracker button      | `src/data/site.ts` → `portfolioSheetUrl`|
| Colors and fonts                          | `src/styles/global.css` (the `@theme`)  |
| Portfolio positions & NAV history         | `src/data/portfolio.json`               |
| The About page text / timeline            | `src/pages/about.astro`                 |
| The Methodology or Disclaimer wording     | `src/pages/methodology.astro` / `disclaimer.astro` |
| The live site URL (for SEO/RSS)           | `astro.config.mjs` → `site`             |

Anything marked `[verify]` in the code is a placeholder I guessed — confirm or replace it.

---

## Publishing a report

The full, step-by-step, no-jargon version is in **[PUBLISHING.md](./PUBLISHING.md)**. The short
version:

1. Put the report PDF in `public/reports/`.
2. Run `npm run new-report` and answer the prompts (or copy an existing file in
   `src/content/reports/` and edit it).
3. Push to GitHub. Cloudflare rebuilds and your report is live in ~1 minute.

You never edit page code to add a report — the index and the report page build themselves.

---

## Build it for production

```bash
npm run build    # outputs the finished site into the dist/ folder
npm run preview  # serve that finished site locally to check it
```

`npm run build` is also the command your host runs automatically on every push.

---

## Deploy (auto-deploy on every push)

This is covered click-by-click at the bottom of the conversation that created the site, and again in
short form here.

### Cloudflare Pages (recommended)

1. Push this project to a GitHub repository (see PUBLISHING.md).
2. At <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to
   Git**, pick your repo.
3. Set the build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy.** Every future `git push` redeploys automatically.

### Netlify (one-line alternative)

Netlify works the same way: connect the repo and set **build command** `npm run build` and **publish
directory** `dist`. That's the only difference.

### Custom domain (later)

In Cloudflare Pages → your project → **Custom domains** → add your domain and follow the DNS prompts.
Then update `site` in `astro.config.mjs` to your real domain and push, so links in the RSS feed,
sitemap, and share previews use it.

---

## Optional: the `/admin` form-based editor (Decap CMS)

There's an optional admin panel at `/admin` that lets you publish reports through a web form instead
of editing files. It needs one extra setup step (connecting GitHub login). It is **optional** — the
file-based flow above already does everything. Setup notes are in
[PUBLISHING.md](./PUBLISHING.md#optional-the-admin-form-editor).

---

## Honest-framing (it's part of the brand)

Every page carries an "Educational / paper portfolio / not investment advice" line, every report
shows its publication date and price at publication, the portfolio is benchmarked against the S&P
500, and **losing positions stay published**. Please keep these — they're the point.
