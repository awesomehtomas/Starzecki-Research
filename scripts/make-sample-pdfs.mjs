// Generates simple, valid placeholder PDFs for the sample reports so the
// embedded viewer has something to show. You will replace these with your real
// exported reports. Run with: node scripts/make-sample-pdfs.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/reports');
mkdirSync(outDir, { recursive: true });

function escapePdf(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

// Build a one-page PDF from an array of text lines.
function makePdf(lines) {
  // Content stream: place each line with an absolute text matrix (Tm).
  let content = 'BT\n';
  let y = 720;
  lines.forEach((line, i) => {
    const size = i === 0 ? 22 : i === 1 ? 13 : 11;
    content += `/F1 ${size} Tf\n1 0 0 1 72 ${y} Tm\n(${escapePdf(line)}) Tj\n`;
    y -= i === 0 ? 36 : 22;
  });
  content += 'ET';

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, 'binary');
}

const reports = [
  { file: 'vital-farms-vitl.pdf', title: 'Vital Farms (VITL) — Starter Long' },
  { file: 'wayfair-w.pdf', title: 'Wayfair (W) — Short' },
  { file: 'stoneco-stne.pdf', title: 'StoneCo (STNE) — Long' },
  { file: 'coupang-cpng.pdf', title: 'Coupang (CPNG) — Hold' },
];

for (const r of reports) {
  const pdf = makePdf([
    r.title,
    'Starzecki Research — SAMPLE / PLACEHOLDER',
    '',
    'This is a placeholder PDF generated for the demo.',
    'Replace it with your real exported report in public/reports/.',
    '',
    'Educational use only. Not investment advice.',
  ]);
  writeFileSync(resolve(outDir, r.file), pdf);
  console.log('wrote', r.file);
}
