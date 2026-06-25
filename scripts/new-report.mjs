/*
  Interactive report scaffolder.  Run:  npm run new-report
  It asks you each field, fills today's date by default, and writes a ready-to-go
  markdown file into src/content/reports/. Then you just drop the matching PDF
  into public/reports/ and publish.
*/
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportsDir = resolve(__dirname, '../src/content/reports');

// Queue-based line reader so it works whether you type one line at a time OR
// the input arrives all at once (pasted / piped).
const rl = createInterface({ input, output, terminal: false });
const lineQueue = [];
let pending = null;
let closed = false;
rl.on('line', (line) => {
  if (pending) {
    const r = pending;
    pending = null;
    r(line);
  } else {
    lineQueue.push(line);
  }
});
rl.on('close', () => {
  closed = true;
  if (pending) {
    const r = pending;
    pending = null;
    r(null);
  }
});
function readLine() {
  if (lineQueue.length) return Promise.resolve(lineQueue.shift());
  if (closed) return Promise.resolve(null);
  return new Promise((res) => {
    pending = res;
  });
}

const today = new Date().toISOString().slice(0, 10);

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function ask(question, def = '') {
  output.write(`${question}${def ? ` [${def}]` : ''}: `);
  const a = await readLine();
  return (a == null ? '' : a.trim()) || def;
}

async function askChoice(question, choices, def) {
  while (true) {
    const a = (await ask(`${question} (${choices.join('/')})`, def)).trim();
    const match = choices.find((c) => c.toLowerCase() === a.toLowerCase());
    if (match) return match;
    console.log(`  Please choose one of: ${choices.join(', ')}`);
  }
}

async function askNumber(question, def) {
  while (true) {
    const a = await ask(question, def);
    const n = Number(a);
    if (!Number.isNaN(n) && a !== '') return n;
    console.log('  Please enter a number (e.g. 38.50).');
  }
}

console.log('\n  New report  —  press Enter to accept the [default].\n');

const ticker = (await ask('Ticker (e.g. VITL)')).toUpperCase();
const company = await ask('Company name (e.g. Vital Farms)');
const ratingShort = await askChoice('Rating', ['Long', 'Short', 'Hold'], 'Long');
const titleDefault = `${company} (${ticker}) — ${ratingShort}`;
const title = await ask('Title', titleDefault);
const sector = await ask('Sector (e.g. Consumer Staples)');
const publishDate = await ask('Publish date (YYYY-MM-DD)', today);
const conviction = await askChoice('Conviction', ['Low', 'Medium', 'High'], 'Medium');
const priceAtPublication = await askNumber('Price at publication', '0');
const priceTarget = await askNumber('Price target', '0');
const horizon = await ask('Horizon', '12–18 months');
const status = await askChoice('Status', ['Open', 'Closed'], 'Open');
const summary = await ask('One-line summary (shown on cards)', 'TODO: 1–2 sentence thesis.');

const slugDefault = slugify(`${company}-${ticker}`);
const slug = slugify((await ask('File name (slug)', slugDefault)) || slugDefault);
const pdfDefault = `/reports/${slug}.pdf`;
const pdf = await ask('PDF path under /public', pdfDefault);
const modelUrl = await ask('Google Sheets model URL (optional, Enter to skip)', '');
const tagsRaw = await ask('Tags, comma-separated (optional)', '');
const tags = tagsRaw
  ? tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  : [];

rl.close();

const fm = [
  '---',
  `title: ${JSON.stringify(title)}`,
  `ticker: ${JSON.stringify(ticker)}`,
  `company: ${JSON.stringify(company)}`,
  `sector: ${JSON.stringify(sector)}`,
  `publishDate: ${publishDate}`,
  `rating: ${JSON.stringify(ratingShort)}`,
  `conviction: ${JSON.stringify(conviction)}`,
  `priceAtPublication: ${priceAtPublication}`,
  `priceTarget: ${priceTarget}`,
  `horizon: ${JSON.stringify(horizon)}`,
  `status: ${JSON.stringify(status)}`,
  `summary: ${JSON.stringify(summary)}`,
  `pdf: ${JSON.stringify(pdf)}`,
  ...(modelUrl ? [`modelUrl: ${JSON.stringify(modelUrl)}`] : []),
  ...(tags.length ? [`tags: ${JSON.stringify(tags)}`] : []),
  '---',
  '',
  '<!-- Optional: a short written summary above the embedded PDF. Can be left empty. -->',
  '',
].join('\n');

mkdirSync(reportsDir, { recursive: true });
const outPath = resolve(reportsDir, `${slug}.md`);
if (existsSync(outPath)) {
  console.error(`\n  ✗ ${slug}.md already exists. Choose a different slug.\n`);
  process.exit(1);
}
writeFileSync(outPath, fm);

console.log(`\n  ✓ Created src/content/reports/${slug}.md`);
console.log(`  → Now drop your PDF here:  public${pdf}`);
console.log('  → Preview with:  npm run dev');
console.log('  → Publish by committing/pushing to GitHub.\n');
