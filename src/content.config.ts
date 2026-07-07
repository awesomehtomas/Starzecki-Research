import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  The `reports` collection.

  Every report is one Markdown file in src/content/reports/. The fields below
  (the "frontmatter") are validated automatically — if you forget one or get a
  type wrong, the build tells you exactly what's missing. The Research index and
  individual report pages are generated from this collection, so you NEVER edit
  page code to publish a new report.
*/
const reports = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reports' }),
  schema: z.object({
    title: z.string(), // e.g. "Vital Farms (VITL) — Starter Long"
    ticker: z.string(),
    company: z.string(),
    sector: z.string(), // used for the sector filter on /research
    publishDate: z.coerce.date(), // "2026-06-25" — locks the publication timestamp
    rating: z.enum(['Long', 'Short', 'Hold']),
    conviction: z.enum(['Low', 'Medium', 'High']),
    priceAtPublication: z.number(),
    priceTarget: z.number(),
    horizon: z.string(), // e.g. "12–18 months"
    status: z.enum(['Open', 'Closed']).default('Open'),
    summary: z.string(), // 1–2 sentence thesis shown on cards
    pdf: z.string(), // path under /public, e.g. "/reports/vitl-2026-06.pdf"
    modelUrl: z.string().url().optional(), // Google Sheets link for the model
    tags: z.array(z.string()).optional(),
    // Optional valuation anchors, shown in the report tearsheet when present.
    evEbitda: z.number().optional(), // EV/EBITDA multiple, e.g. 8.5 → displayed "8.5×"
    fcfYield: z.number().optional(), // FCF yield in percent, e.g. 5.2 → displayed "5.2%"
  }),
});

export const collections = { reports };
