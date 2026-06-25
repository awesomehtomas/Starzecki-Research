// Small formatting helpers shared across pages.

export function formatDate(d: Date): string {
  // Format in UTC so a date entered as "2026-06-25" never displays as the 24th
  // in timezones behind UTC. Publication dates are part of the track record.
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n);
}

// Whole-dollar currency (no cents) — for large figures like NAV.
export function formatPriceWhole(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

// Signed percentage, e.g. 0.234 -> "+23.4%".
export function pct(n: number, digits = 1): string {
  return (n >= 0 ? '+' : '') + (n * 100).toFixed(digits) + '%';
}

// Implied move from price-at-publication to the price target (raw, signed).
// Long theses are positive; short theses are negative.
export function impliedMove(priceAtPublication: number, priceTarget: number): number {
  if (!priceAtPublication) return 0;
  return priceTarget / priceAtPublication - 1;
}
