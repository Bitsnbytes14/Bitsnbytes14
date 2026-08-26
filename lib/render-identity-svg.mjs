// render-identity-svg.mjs
import { PALETTE, esc } from './theme.mjs';

const LABEL_WIDTH = 12;

function leaderRow(label, value) {
  return `${label.toUpperCase()}`.padEnd(LABEL_WIDTH, '.') + ` ${value}`;
}

export function identityBody(profile, opts = {}) {
  const width = opts.width || 900;
  const marginX = 26;
  const lineH = 21;

  const fields = [
    ['name', profile.name],
    ['role', profile.role],
    ...(profile.focus ? [['focus', profile.focus]] : []),
    ...(profile.education ? [['education', profile.education]] : []),
  ];

  const rows = [{ type: 'fields', items: fields }];
  if (profile.stack?.length) {
    rows.push({ type: 'label', text: 'STACK' });
    rows.push({ type: 'fields', items: profile.stack, indent: true });
  }
  if (profile.seeking?.length) {
    rows.push({ type: 'label', text: 'SEEKING' });
    rows.push({ type: 'fields', items: profile.seeking, indent: true });
  }
  if (profile.links?.length) {
    rows.push({ type: 'label', text: 'LINKS' });
    rows.push({ type: 'fields', items: profile.links, indent: true });
  }

  let y = 46;
  const rowYs = [];
  for (const block of rows) {
    if (block.type === 'label') {
      y += lineH * 0.95;
      rowYs.push(y);
      y += lineH * 0.5;
    } else {
      for (const _ of block.items) { y += lineH; rowYs.push(y); }
      y += lineH * 0.45;
    }
  }
  const height = y + 14;

  let body = '';
  let ptr = 0;
  for (const block of rows) {
    if (block.type === 'label') {
      const ly = rowYs[ptr++];
      body += `<text x="${marginX}" y="${ly}" fill="${PALETTE.sweepGlow}" font-size="11" letter-spacing="1.5">${esc(block.text)}</text>\n`;
    } else {
      const indentPx = block.indent ? 16 : 0;
      for (const [label, value] of block.items) {
        const ly = rowYs[ptr++];
        const line = leaderRow(label, value);
        const dotIdx = line.indexOf(' ');
        body += `<text x="${marginX + indentPx}" y="${ly}" font-size="12.5">` +
          `<tspan fill="${PALETTE.textMuted}">${esc(line.slice(0, dotIdx))} </tspan>` +
          `<tspan fill="${PALETTE.text}">${esc(line.slice(dotIdx + 1))}</tspan>` +
          `</text>\n`;
      }
    }
  }

  const cursor = `<rect x="${width - marginX - 8}" y="14" width="6" height="11" fill="${PALETTE.sweep}">
    <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" keyTimes="0;0.5;0.51;1" repeatCount="indefinite"/>
  </rect>`;

  const innerSvg = `
  <text x="${marginX}" y="24" fill="${PALETTE.sweep}" font-size="12" letter-spacing="0.5">IDENTITY://WHOAMI</text>
  ${cursor}
  <line x1="${marginX}" y1="31" x2="${width - marginX}" y2="31" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${body}`;

  return { innerSvg, width, height };
}
