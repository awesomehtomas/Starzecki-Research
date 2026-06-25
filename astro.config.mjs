import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// IMPORTANT: change `site` to your real URL once Cloudflare gives you one
// (e.g. https://starzecki-research.pages.dev or your custom domain).
// It is used to build correct links in the sitemap, RSS feed, and social
// share previews. The site still works locally if this is "wrong".
export default defineConfig({
  site: 'https://starzecki-research.pages.dev',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
