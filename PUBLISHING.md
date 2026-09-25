# How to publish — Starzecki Research

This guide assumes **no coding knowledge**. Your publishing loop is short:

> **Write the report → export it as a PDF → publish the model to Google Sheets → add one short
> entry → push. Live in ~1 minute.**

There are three ways to do the "add one short entry" part. Pick whichever feels comfortable — they
all produce the same result.

---

## Before your first publish (one-time)

Open `src/data/site.ts` and replace the placeholder with your real **LinkedIn URL**. Save. That's it.

---

## Each report needs two things

1. **A PDF** of the report — saved into the `public/reports/` folder.
2. **A small text entry** — one file in `src/content/reports/` describing the report (its ticker,
   rating, price target, etc.). This is what builds the report's page and its card on the Research
   index.

The text entry uses these fields (the "frontmatter"):

| Field                | Example                                  | Notes                              |
| -------------------- | ---------------------------------------- | ---------------------------------- |
| `title`              | `Vital Farms (VITL) — Starter Long`      |                                    |
| `ticker`             | `VITL`                                    |                                    |
| `company`            | `Vital Farms`                             |                                    |
| `sector`             | `Consumer Staples`                        | Used by the sector filter          |
| `publishDate`        | `2026-06-25`                              | Locks your timestamp — don't backdate |
| `rating`             | `Buy`, `Neutral`, or `Sell`               |                                    |
| `conviction`         | (retired — leave out)                     | Optional; no longer used           |
| `priceAtPublication` | `38.50`                                   | The price the day you publish      |
| `priceTarget`        | `50.00`                                   |                                    |
| `horizon`            | `12–18 months`                            |                                    |
| `status`             | `Open` or `Closed`                        | New reports are `Open`             |
| `summary`            | One or two sentences                      | Shown on the card                  |
| `pdf`                | `/reports/vital-farms-vitl.pdf`           | Must match your PDF's file name    |
| `modelUrl`           | `https://docs.google.com/spreadsheets/…`  | Optional — the "Open the model" button |
| `tags`               | `["branded food", "small-cap"]`           | Optional                           |

---

## Method A — `npm run new-report` (easiest on your own computer)

In a terminal, in this folder:

```bash
npm run new-report
```

It asks you each field and fills today's date automatically. When it finishes, it tells you the exact
file name to give your PDF. Then:

1. Save/rename your report PDF to that name and put it in `public/reports/`.
2. Preview with `npm run dev` to check it looks right.
3. Publish (see **"Going live"** below).

---

## Method B — edit on github.com (no tools, works from any computer)

Once your project is on GitHub, you can publish entirely in the browser:

1. Go to your repo on github.com.
2. Open the `public/reports/` folder → **Add file** → **Upload files** → drag in your PDF →
   **Commit changes**.
3. Open the `src/content/reports/` folder → **Add file** → **Create new file**.
   - Name it something like `vital-farms-vitl.md`.
   - Paste a copy of an existing report's text (open another `.md` file to copy its shape) and edit
     the values, **making sure `pdf:` matches the PDF you just uploaded**.
   - **Commit changes.**

That's it — GitHub saves it, Cloudflare rebuilds, and it's live shortly after.

> Tip: keep one of the sample files open in another tab as a template while you fill in a new one.

---

## Method C — the `/admin` form editor (optional)

See [the bottom of this file](#optional-the-admin-form-editor). It's a web form, but needs a one-time
login setup. Methods A and B already cover everything, so this is purely a convenience.

---

## Going live (pushing your changes)

Pushing = sending your saved changes up to GitHub, which triggers Cloudflare to rebuild.

**With GitHub Desktop (recommended for beginners):**

1. Open **GitHub Desktop**. It shows your changed files.
2. Type a short summary (e.g. "Add VITL long") in the bottom-left box → **Commit to main**.
3. Click **Push origin** (top bar).
4. Wait ~1 minute. Refresh your live site — the new report is there.

**With the command line:**

```bash
git add .
git commit -m "Add VITL long"
git push
```

If you used **Method B** (github.com), you already pushed when you clicked "Commit changes" — nothing
else to do.

---

## Linking a report's model

Each report can link its full financial model. In the report's markdown file, set:

- **`modelUrl`** to the model's shareable link — e.g. a **read-only Google Sheet**
  (`https://docs.google.com/spreadsheets/…`).

The report page then shows an "Open the model (Google Sheets)" button. Set the sheet's sharing to
**"Anyone with the link — Viewer"** so readers can open it. Omit `modelUrl` for a report with no model.

---

## A few honest-framing rules (please keep these)

- Don't backdate `publishDate`, and don't change `priceAtPublication` after the fact.
- Don't delete reports or positions that went against you — set them to `Closed` instead.
- Keep the "not investment advice" lines intact.

These constraints are what make the track record trustworthy.

---

## Optional: the `/admin` form editor

`/admin` runs **Decap CMS**, a form-based publisher that commits to GitHub for you. To turn it on:

1. Open `public/admin/config.yml` and change the `repo:` line to `your-github-username/your-repo`.
2. Decap needs a way to log you into GitHub. The simplest path on Cloudflare is to deploy a tiny
   **OAuth helper** and point Decap at it — follow Decap's official guide:
   <https://decapcms.org/docs/backends-overview/> (GitHub backend). You'll create a GitHub **OAuth
   App** and host a small auth endpoint (a free Cloudflare Worker works well).
3. Once connected, visit `https://your-site/admin`, log in with GitHub, and use the **Reports** form:
   fill the fields, upload the PDF, and click **Publish**. It commits to GitHub for you and the site
   redeploys.

If any of that feels fiddly, **skip it** — Methods A and B above already give you a complete,
reliable workflow. `/admin` is a nice-to-have, not a requirement.
