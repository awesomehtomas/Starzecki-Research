/*
  Site-wide settings. Edit the placeholders below (LinkedIn, the live tracker
  Google Sheet) whenever you're ready — everything else flows from here.
*/
export const site = {
  name: 'Starzecki Research',
  shortName: 'Starzecki Research',
  tagline: 'Independent equity research.',
  description:
    'In-depth equity research, in the open. Every call is timestamped at publication and left on the record — win or lose. Not investment advice.',
  author: 'Thomas Starzecki',
  email: 'thomasstarzeckihof@gmail.com',

  linkedin: 'https://www.linkedin.com/in/thomas-starzecki-794751270',

  // Once you create your X/Twitter account, paste its URL here (e.g.
  // 'https://x.com/yourhandle') and it appears in the footer automatically.
  twitterUrl: '',

  // The short "not advice" line shown across the site.
  notAdvice: 'Educational equity research. Not investment advice.',

  // Main navigation (order matters).
  nav: [
    { href: '/research', label: 'Research' },
    { href: '/about', label: 'About' },
    { href: '/methodology', label: 'Methodology' },
  ],
};

export type Site = typeof site;
