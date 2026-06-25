import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// `site` is your live, canonical URL. It is used to build correct links in the
// sitemap, RSS feed, and social share previews. If you ever change domains,
// update this line and push. The site still works locally if this is "wrong".
export default defineConfig({
  site: 'https://starzeckiresearch.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
