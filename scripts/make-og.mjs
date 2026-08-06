// Generates the default social-share image (public/og-default.png, 1200x630)
// shown when a link is shared on LinkedIn / X. Re-run after changing branding:
//   node scripts/make-og.mjs
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e2a3b"/>
  <rect x="0" y="0" width="1200" height="8" fill="#9c6b3f"/>
  <g transform="translate(80, 110)">
    <rect x="0" y="0" width="84" height="84" rx="10" fill="#f7f4ed"/>
    <text x="42" y="58" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="700" fill="#0e2a3b" text-anchor="middle">SR</text>
  </g>
  <text x="80" y="320" font-family="Georgia, 'Times New Roman', serif" font-size="74" font-weight="700" fill="#f7f4ed">Starzecki Research</text>
  <text x="80" y="385" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#b9905f">Independent equity research</text>
  <text x="80" y="520" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#c9d3da">In-depth reports and models · timestamped · on the record</text>
  <text x="80" y="565" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#7f95a3">Educational. Not investment advice.</text>
</svg>`;

const out = resolve(__dirname, '../public/og-default.png');
await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote public/og-default.png');
