// render-identity-svg.mjs
// Expedition-dossier styling: each section is a bracketed field card with
// coordinate tick marks down the left edge and a header rule, so the data
// reads as part of the same document as the mountain viewport above it.

import { PALETTE, esc } from './theme.mjs';

const LABEL_WIDTH = 11;

export function identityBody(profile, opts = {}) {
  const width = opts.width || 900;
  const marginX = 26;
  const lineH = 21;
  const cardPadY = 12;
  const cardGap = 12;
  const headerH = 26;

  const sections = [];
  sections.push({
    title: 'SUBJECT',
    rows: [
      ['name', profile.name],
      ['role', profile.role],
      ...(profile.focus ? [['focus', profile.focus]] : []),
      ...(profile.education ? [['education', profile.education]] : []),
    ],
  });
  if (profile.stack?.length) sections.push({ title: 'STACK', rows: profile.stack });
  if (profile.seeking?.length) sections.push({ title: 'SEEKING', rows: profile.seeking });
  if (profile.links?.length) sections.push({ title: 'LINKS', rows: profile.links });

  let y = 44;
  let body = '';

  for (const section of sections) {
    const cardH = headerH + section.rows.length * lineH + cardPadY;
    const cardX = marginX;
    const cardW = width - marginX * 2;

    // Card frame: left accent bar + faint panel + top rule
    body += `<rect x="${cardX}" y="${y}" width="${cardW}" height="${cardH}" rx="4" fill="${PALETTE.panel}" opacity="0.55"/>\n`;
    body += `<rect x="${cardX}" y="${y}" width="2.5" height="${cardH}" fill="${PALETTE.sweep}" opacity="0.5"/>\n`;
    body += `<text x="${cardX + 16}" y="${y + 17}" fill="${PALETTE.sweep}" font-size="10.5" letter-spacing="2">${esc(section.title)}</text>\n`;
    body += `<line x1="${cardX + 16}" y1="${y + 23}" x2="${cardX + cardW - 16}" y2="${y + 23}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>\n`;

    section.rows.forEach(([label, value], i) => {
      const ry = y + headerH + i * lineH + 12;
      // coordinate tick
      body += `<line x1="${cardX + 8}" y1="${ry - 4}" x2="${cardX + 12}" y2="${ry - 4}" stroke="${PALETTE.textMuted}" stroke-width="1" opacity="0.6"/>\n`;
      const padded = String(label).toUpperCase().padEnd(LABEL_WIDTH, '.');
      body += `<text x="${cardX + 20}" y="${ry}" font-size="12.5">` +
        `<tspan fill="${PALETTE.textMuted}">${esc(padded)} </tspan>` +
        `<tspan fill="${PALETTE.text}">${esc(value)}</tspan>` +
        `</text>\n`;
    });

    y += cardH + cardGap;
  }

  const height = y + 4;

  const cursor = `<rect x="${width - marginX - 8}" y="12" width="6" height="11" fill="${PALETTE.sweep}">
    <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" keyTimes="0;0.5;0.51;1" repeatCount="indefinite"/>
  </rect>`;

  const innerSvg = `
  <text x="${marginX}" y="22" fill="${PALETTE.sweep}" font-size="12" letter-spacing="0.5">DOSSIER://EXPEDITION_LOG</text>
  ${cursor}
  <line x1="${marginX}" y1="29" x2="${width - marginX}" y2="29" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${body}`;

  return { innerSvg, width, height };
}
