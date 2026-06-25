/*
  Social post generator.  Run:  npm run social            (uses your latest report)
                            or:  npm run social <slug>     (a specific report)

  Reads a report's frontmatter and writes ready-to-paste LinkedIn + X/Twitter
  posts into social/<slug>.md. You review, tweak the hook, and post — nothing is
  sent automatically (that keeps the quality and control where it matters).
*/
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const reportsDir = resolve(root, 'src/content/reports');
const outDir = resolve(root, 'social');

// Live base URL — read from astro.config.mjs so it always matches your domain.
function getSiteUrl() {
  try {
    const cfg = readFileSync(resolve(root, 'astro.config.mjs'), 'utf8');
    const m = cfg.match(/site:\s*['"]([^'"]+)['"]/);
    if (m) return m[1].replace(/\/$/, '');
  } catch {}
  return 'https://starzeckiresearch.com';
}

// Minimal frontmatter reader (handles the simple key: value lines we use).
function parseFrontmatter(raw) {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return {};
  const data = {};
  for (const line of fm[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let [, key, val] = m;
    val = val.trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return data;
}

function loadReports() {
  if (!existsSync(reportsDir)) return [];
  return readdirSync(reportsDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => ({
      slug: f.replace(/\.(md|mdx)$/, ''),
      data: parseFrontmatter(readFileSync(resolve(reportsDir, f), 'utf8')),
    }));
}

const reports = loadReports();
if (reports.length === 0) {
  console.error('\n  No reports found in src/content/reports/.');
  console.error('  Publish one first (npm run new-report), then run this again.\n');
  process.exit(1);
}

const argSlug = process.argv[2];
let report;
if (argSlug) {
  report = reports.find((r) => r.slug === argSlug);
  if (!report) {
    console.error(`\n  No report named "${argSlug}". Available:`);
    reports.forEach((r) => console.error('   - ' + r.slug));
    console.error('');
    process.exit(1);
  }
} else {
  report = reports.sort((a, b) =>
    String(b.data.publishDate).localeCompare(String(a.data.publishDate)),
  )[0];
}

const d = report.data;
const site = getSiteUrl();
const url = `${site}/research/${report.slug}/`;
const isFirst = reports.length === 1;
const verb = d.rating === 'Hold' ? 'call' : 'thesis';

const p0 = Number(d.priceAtPublication);
const pt = Number(d.priceTarget);
const implied = p0 ? pt / p0 - 1 : 0;
const impliedStr = (implied >= 0 ? '+' : '') + (implied * 100).toFixed(0) + '%';
const ptStr = Number.isNaN(pt) || pt === 0 ? '' : `$${pt}`;

// ---------- LinkedIn ----------
const liOpen = isFirst
  ? 'My first piece of published equity research is live.'
  : 'New equity research is live.';

const linkedin = `${liOpen}

A ${d.rating} ${verb} on ${d.company} (${d.ticker}): ${d.summary}

It's published on Starzecki Research — an independent platform where I do equity research in the open: in-depth long/short work, a paper portfolio benchmarked against the S&P 500, and every call timestamped and left on the record whether it works or not.

A résumé can show you what I've done. It can't show you how I think. This is where I show it.

Full report (PDF + model): ${url}

Educational, not investment advice. Feedback from anyone in equity research or investment management is genuinely welcome.

#EquityResearch #Investing #Finance #CFA`;

// ---------- X / Twitter (<=280; X counts any URL as 23 chars) ----------
function tweetLen(text) {
  return text.replace(/https?:\/\/\S+/g, 'x'.repeat(23)).length;
}
const xHead = `New report — ${d.rating} ${d.ticker} (${d.company}).`;
const xTail = `${ptStr ? `Target ${ptStr} (${impliedStr}). ` : ''}Full write-up + model:\n${url}`;
const buildTweet = (h) => (h ? `${xHead}\n\n${h}\n\n${xTail}` : `${xHead}\n\n${xTail}`);

let hook = d.summary || '';
const trimmed = hook;
while (hook.length > 0 && tweetLen(buildTweet(hook)) > 278) {
  const cut = hook.replace(/\s+\S*$/, '');
  hook = cut === hook ? hook.slice(0, -1) : cut;
}
if (hook && hook !== trimmed) hook = hook.replace(/[.,;:\s]+$/, '') + '…';
const tweet = buildTweet(hook);

// ---------- write + print ----------
mkdirSync(outDir, { recursive: true });
const out = `Social posts for: ${d.title}
Generated ${new Date().toISOString().slice(0, 10)} · review and tweak before posting.

====================  LINKEDIN  ====================

${linkedin}

====================  X / TWITTER  (${tweetLen(tweet)}/280)  ====================

${tweet}
`;
writeFileSync(resolve(outDir, `${report.slug}.md`), out);

console.log('\n' + out);
console.log(`  ✓ Saved to social/${report.slug}.md — open it, tweak the hook, and post.\n`);
