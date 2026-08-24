// render-identity-svg.mjs
import { PALETTE } from './render-radar-svg.mjs';

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const LABEL_WIDTH = 12;

function leaderRow(label, value) {
  const padded = `${label.toUpperCase()}`.padEnd(LABEL_WIDTH, '.');
  return `${padded} ${value}`;
}

export function identityBody(profile, opts = {}) {
  const width = opts.width || 620;
  const marginX = 24;
  const lineH = 20;
  const fields = [
    ['name', profile.name],
    ['role', profile.role],
    ...(profile.focus ? [['focus', profile.focus]] : []),
    ...(profile.education ? [['education', profile.education]] : []),
    ['status', profile.status || 'Building · Learning · Shipping'],
  ];

  const rows = [];
  rows.push({ type: 'fields', items: fields });
  if (profile.stack?.length) rows.push({ type: 'label', text: 'STACK' });
  if (profile.stack?.length) rows.push({ type: 'fields', items: profile.stack, indent: true });
  if (profile.links?.length) rows.push({ type: 'label', text: 'LINKS' });
  if (profile.links?.length) rows.push({ type: 'fields', items: profile.links, indent: true });

  let y = 66;
  const rowYs = [];
  for (const block of rows) {
    if (block.type === 'label') {
      y += lineH * 0.9;
      rowYs.push(y);
      y += lineH * 0.5;
    } else {
      for (const _ of block.items) {
        y += lineH;
        rowYs.push(y);
      }
      y += lineH * 0.4;
    }
  }
  const height = y + 20;

  let body = '';
  let ptr = 0;
  for (const block of rows) {
    if (block.type === 'label') {
      const ly = rowYs[ptr++];
      body += `<text x="${marginX}" y="${ly}" fill="${PALETTE.textMuted}" font-size="11" letter-spacing="1">${esc(block.text)}</text>\n`;
    } else {
      const indentPx = block.indent ? 14 : 0;
      for (const [label, value] of block.items) {
        const ly = rowYs[ptr++];
        const line = leaderRow(label, value);
        const dotIdx = line.indexOf(' ');
        const labelPart = line.slice(0, dotIdx);
        const valuePart = line.slice(dotIdx + 1);
        body += `<text x="${marginX + indentPx}" y="${ly}" font-size="12.5">` +
          `<tspan fill="${PALETTE.textMuted}">${esc(labelPart)} </tspan>` +
          `<tspan fill="${PALETTE.text}">${esc(valuePart)}</tspan>` +
          `</text>\n`;
      }
    }
  }

  const blinkCursor = `<rect x="${width - marginX - 8}" y="14" width="6" height="11" fill="${PALETTE.sweep}">
  <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" keyTimes="0;0.5;0.51;1" repeatCount="indefinite"/>
</rect>`;

  const innerSvg = `
  <text x="${marginX}" y="26" fill="${PALETTE.sweep}" font-size="12" letter-spacing="0.5">IDENTITY://WHOAMI</text>
  ${blinkCursor}
  <line x1="${marginX}" y1="33" x2="${width - marginX}" y2="33" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  <text x="${marginX}" y="52" fill="${PALETTE.sweepGlow}" font-size="12">$ whoami --verbose</text>
  ${body}`;

  return { innerSvg, width, height };
}

export function renderIdentitySVG(profile, opts = {}) {
  const { innerSvg, width, height } = identityBody(profile, opts);
  const bx0 = 4, by0 = 4, bx1 = width - 4, by1 = height - 4, bl = 10;
  const corners = `
<g stroke="${PALETTE.textMuted}" stroke-width="1.2" fill="none" opacity="0.7">
  <path d="M${bx0},${by0 + bl} L${bx0},${by0} L${bx0 + bl},${by0}"/>
  <path d="M${bx1 - bl},${by0} L${bx1},${by0} L${bx1},${by0 + bl}"/>
  <path d="M${bx0},${by1 - bl} L${bx0},${by1} L${bx0 + bl},${by1}"/>
  <path d="M${bx1 - bl},${by1} L${bx1},${by1} L${bx1},${by1 - bl}"/>
</g>`;
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="'JetBrains Mono','Fira Code',ui-monospace,Menlo,Consolas,monospace">
  <rect x="0" y="0" width="${width}" height="${height}" rx="6" fill="${PALETTE.bg}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${innerSvg}
  ${corners}
</svg>`;
}
