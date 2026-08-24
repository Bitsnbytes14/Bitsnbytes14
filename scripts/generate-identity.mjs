import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { renderIdentitySVG } from '../lib/render-identity-svg.mjs';

const profile = JSON.parse(readFileSync(new URL('../profile.json', import.meta.url)));
const svg = renderIdentitySVG(profile);

mkdirSync(new URL('../dist', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/identity-card.svg', import.meta.url), svg, 'utf8');
console.log('Wrote dist/identity-card.svg');
