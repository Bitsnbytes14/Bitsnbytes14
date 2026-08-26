import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { renderConsoleSVG } from '../lib/render-console-svg.mjs';

const profile = JSON.parse(readFileSync(new URL('../profile.json', import.meta.url)));
const svg = renderConsoleSVG(profile);

mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/console-card.svg', import.meta.url), svg, 'utf8');
console.log('Wrote dist/console-card.svg');
