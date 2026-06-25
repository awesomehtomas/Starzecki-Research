import type { APIRoute } from 'astro';

// Generated at build time so the Sitemap URL always matches `site` in astro.config.mjs.
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
