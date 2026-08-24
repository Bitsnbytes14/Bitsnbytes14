import { writeFileSync, mkdirSync } from 'node:fs';
import { renderRadarSVG } from '../lib/render-radar-svg.mjs';

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);

const WEEKS = 52;
const weeks = [];

for (let w = 0; w < WEEKS; w++) {
  const week = [];
  for (let d = 0; d < 7; d++) {
    const isWeekend = d === 0 || d === 6;
    let base = isWeekend ? rand() * 3 : rand() * 6;
    if (rand() > 0.85) base += rand() * 10;
    if (rand() > 0.9) base = 0;
    week.push({ date: `w${w}d${d}`, count: Math.round(base) });
  }
  weeks.push(week);
}

const total = weeks.flat().reduce((s, d) => s + d.count, 0);

const svg = renderRadarSVG(weeks, {
  title: 'CONTRIB://RADAR_SCAN',
  subtitle: `SAMPLE DATA · TOTAL ${total}`,
  duration: 20,
});

mkdirSync(new URL('../preview', import.meta.url), { recursive: true });
writeFileSync(new URL('../preview/radar-grid-preview.svg', import.meta.url), svg, 'utf8');
console.log('Wrote preview/radar-grid-preview.svg —', weeks.length, 'weeks,', total, 'sample contributions');
