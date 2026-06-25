import data from '../data/portfolio.json';

export interface RawPosition {
  ticker: string;
  company: string;
  sector: string;
  direction: 'Long' | 'Short';
  entryDate: string;
  entryPrice: number;
  currentPrice: number;
  weight: number;
  status: 'Open' | 'Closed';
  reportSlug?: string;
}

export interface Position extends RawPosition {
  returnPct: number; // direction-aware price-only return
}

// Direction-aware, price-only return for a single position.
function positionReturn(p: RawPosition): number {
  if (!p.entryPrice) return 0;
  return p.direction === 'Short'
    ? (p.entryPrice - p.currentPrice) / p.entryPrice
    : (p.currentPrice - p.entryPrice) / p.entryPrice;
}

export function getPortfolio() {
  const history = data.navHistory;
  const first = history[0];
  const last = history[history.length - 1];

  const navReturn = last.nav / first.nav - 1;
  const spxReturn = last.spx / first.spx - 1;
  const excess = navReturn - spxReturn;
  const navDollars = data.startingCapital * (last.nav / first.nav);

  const positions: Position[] = (data.positions as RawPosition[]).map((p) => ({
    ...p,
    returnPct: positionReturn(p),
  }));

  return {
    inceptionDate: data.inceptionDate,
    startingCapital: data.startingCapital,
    note: data.note,
    history,
    asOf: last.date,
    navReturn,
    spxReturn,
    excess,
    navDollars,
    positions,
  };
}

export type PortfolioSummary = ReturnType<typeof getPortfolio>;
