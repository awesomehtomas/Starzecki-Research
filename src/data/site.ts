/*
  Site-wide settings. Edit the placeholders below (LinkedIn, the live tracker
  Google Sheet) whenever you're ready — everything else flows from here.
*/
export const site = {
  name: 'Starzecki Research',
  shortName: 'Starzecki Research',
  tagline: 'Independent paper equity research.',
  description:
    'In-depth long/short equity research, in the open. Every call is timestamped, benchmarked against the S&P 500, and on the record — win or lose. Not investment advice.',
  author: 'Thomas Starzecki',
  email: 'thomasstarzeckihof@gmail.com',

  linkedin: 'https://www.linkedin.com/in/thomas-starzecki-794751270',

  // Once you create your X/Twitter account, paste its URL here (e.g.
  // 'https://x.com/yourhandle') and it appears in the footer automatically.
  twitterUrl: '',

  // Optional: paste your public Google Sheet portfolio tracker link here to
  // light up the "View the full live tracker" button on /portfolio.
  portfolioSheetUrl: '',

  // The short "not advice" line shown across the site.
  notAdvice:
    'Educational paper portfolio. Not investment advice. No real capital is at risk.',

  // Main navigation (order matters).
  nav: [
    { href: '/research', label: 'Research' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/methodology', label: 'Methodology' },
  ],
};

export type Site = typeof site;
