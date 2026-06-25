/*
  Site-wide settings. Edit the placeholders below (LinkedIn, the live tracker
  Google Sheet) whenever you're ready — everything else flows from here.
*/
export const site = {
  name: 'Starzecki Research',
  shortName: 'Starzecki Research',
  tagline: 'Independent paper equity research — reasoning, in the open.',
  description:
    'Independent, educational equity research with a transparent paper long/short portfolio. Every call is timestamped at publication and benchmarked against the S&P 500. This is not investment advice.',
  author: 'Thomas Starzecki',
  email: 'thomasstarzecki@gmail.com',

  // [verify] Replace with your real LinkedIn profile URL.
  linkedin: 'https://www.linkedin.com/in/thomas-starzecki',

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
