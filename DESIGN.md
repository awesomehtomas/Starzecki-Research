# Starzecki Research — Design System

**Direction:** institutional equity research / editorial finance publication.
FT-grade editorial structure with sell-side tearsheet data discipline.
Authoritative, typographic, restrained — a research note, not a website template.

Every token below lives in [`src/styles/global.css`](src/styles/global.css)
(`@theme` block + `@layer components`). Change it there once and it applies
everywhere. New pages and reports must draw from this file — no ad-hoc hex
values or font stacks in components.

---

## 1. Typography

Three faces, three jobs. Never substitute; never add a fourth.

| Role | Face | Token / class | Used for |
|---|---|---|---|
| Display & reading serif | **Newsreader** (variable, optical size) | `--font-serif` / `font-serif` (body default) | Headlines, report titles, article body, intros |
| UI sans | **Schibsted Grotesk** (variable) | `--font-sans` / `font-sans` | Nav, buttons, labels, captions, table heads |
| Data mono | **IBM Plex Mono** (400/500/600) | `--font-mono` / `font-mono` or `.figure` | Every numeral that is data: prices, targets, %, weights |

Self-hosted via Fontsource (imported at the top of `global.css`). **No Google
Fonts CDN, no Inter, no system-default stacks.**

### Type scale

| Step | Size / leading | Face & weight | Where |
|---|---|---|---|
| Display | `clamp(2.5rem → 3.5rem)` / 1.05 | Newsreader 500, `-0.015em` | Homepage lead headline |
| H1 | `2rem–2.25rem` / 1.15 | Newsreader 500 | Page & report titles |
| H2 | `1.45rem` | Newsreader 500 | Section heads |
| H3 | `1.15rem` | Newsreader 500 | Sub-sections |
| Body (article) | `1.0625rem` / 1.75 | Newsreader 400 | Report notes, about/methodology prose |
| UI text | `0.875rem` | Schibsted 400–500 | Nav, controls, meta lines |
| Label | `0.6875rem`, caps, `+0.14em` | Schibsted 600 | `.label-caps` — eyebrows, stat labels, table heads |
| Data L | `1.375rem` | Plex Mono 500 | Headline stats |
| Data | `0.875rem` | Plex Mono 400–500 | Table cells, stat rows |

Rules: labels are the **only** letterspaced text. At most one eyebrow label per
page section — it is a device, not a default.

## 2. Color

Ink on paper. One accent. P&L colors carry meaning and are never decorative.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1B1813` | Primary text, strong rules, filled buttons |
| `ink-soft` | `#44403A` | Secondary text |
| `muted` | `#6E675C` | Captions, folio lines, table heads |
| `paper` | `#F5F1E8` | Page background |
| `paper-deep` | `#ECE6D9` | Recessed panels, table header strips |
| `card` | `#FBF9F3` | Raised sheets — sparingly |
| `line` | `#D9D2C3` | Hairline rules |
| `accent` | `#6E1423` | **Oxblood — the only accent.** In-text links, the SR mark, primary-button hover. Nothing else. |
| `accent-soft` | `#8A2233` | Hover state of accent text |
| `long` | `#14603F` | Long ratings, gains. Reserved. |
| `short` | `#A62B1F` | Short ratings, losses. Orange-leaning so it never reads as oxblood. |
| `hold` | `#6E675C` | Hold/neutral ratings |

**No gradients. No purple. No new colors** — if a component seems to need one,
the design is wrong.

## 3. Rules & structure

- `.rule-double` — thick-over-thin double rule (3px + 1px ink). The masthead
  device: under the header, top of the footer, under a report masthead. Use at
  most once or twice per page.
- Strong rule — `border-ink`, 1px. Section openers, table head underline.
- Hairline — `border-line`, 1px. Row separators inside lists/tables.
- **Sharp corners everywhere.** No `rounded-*` except `rounded-sm` (2px) at
  most on buttons. No drop shadows, no hover-lift translates, no backdrop blur.

## 4. Components

- **`.stamp`** (+ `text-long` / `text-short` / `text-hold`) — rating badge:
  square-cornered, 1.5px border in its own color, letterspaced caps. Not a pill.
- **Tearsheet stat block** (`StatBlock.astro`) — bordered box, `label-caps`
  labels left, mono figures right, hairline-ruled rows. The signature element:
  homepage lead, report pages.
- **Report index row** (`ReportRow.astro`) — ruled list row, not a card:
  date (mono) · stamp · ticker/company · title (serif) · target & upside
  (mono, right-aligned). Hairline separators.
- **`.btn-primary` / `.btn-outline`** — rectangular, Schibsted caps. Filled ink
  (hover → oxblood) or 1px ink rule.
- **`.link`** — in-text link: oxblood, underlined, offset 3px. Links say what
  they are; no `→` arrow suffixes in copy.
- **Tables** — `label-caps` heads over an ink rule; numeric columns
  right-aligned in mono; hairline row rules; no zebra striping.

## 5. Data presentation

- Every data numeral is mono (`.figure` / `font-mono`) with tabular figures,
  right-aligned in tables and stat rows.
- Signed percentages keep their sign (`+23.4%`) and take `text-long` /
  `text-short` only when the sign is the point.
- Dates in data contexts are mono; dates in prose are prose.

## 6. Spacing & layout

- Containers: `max-w-6xl` for the shell (header/footer), `max-w-5xl` for
  index/data pages, `max-w-3xl` for reading pages (~68ch measure).
- Section rhythm: `py-12` to `py-16`; separate sections with rules, not
  background-color stripes or cards.
- Editorial asymmetry over symmetric card grids: lead story + tearsheet aside,
  ruled lists, two-column stat/prose splits. If a layout is three identical
  boxes in a row, redesign it.
- Mobile-first: single column, stat blocks stack, tables scroll horizontally.

## 7. Motion & voice

- Motion: color transitions ≤120ms only. No entrance animations, no lifts.
  `prefers-reduced-motion` disables smooth scroll.
- Voice: plain, specific, active. Buttons name the action ("Read the report",
  "Download PDF"). No arrow glyphs as decoration, no exclamation marks.

## 8. The mark

Sharp-cornered oxblood square, "SR" in Newsreader, single-color wordmark
"Starzecki Research" in ink beside it, `label-caps` folio line beneath.
Favicon matches. Never the old rounded navy box or two-tone name.
