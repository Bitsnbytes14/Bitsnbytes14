// render-stats-svg.mjs
import { PALETTE } from './render-radar-svg.mjs';

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function truncate(str, maxChars) {
  return str.length > maxChars ? str.slice(0, maxChars - 1) + '…' : str;
}

export function statsBody(m, opts = {}) {
  const width = opts.width || 620;
  const marginX = 24;
  const headerH = 30;
  const statsTop = 46;
  const statsH = 52;
  const meterRowH = 40;
  const height = statsTop + statsH + meterRowH + 14;

  const innerW = width - marginX * 2;
  const colW = innerW / 4;
  const maxChars = Math.floor((colW - 10) / 5.6);

  const segments = [
    { label: 'XP', value: m.xp.toLocaleString(), sub: 'CONTRIBUTIONS' },
    { label: 'LVL', value: `${m.level}`, sub: truncate(m.roleTitle, maxChars) },
    { label: 'COMBO', value: `x${m.combo}`, sub: 'DAY STREAK' },
    { label: 'SHIELD', value: `${m.shieldDays}D`, sub: 'BEST STREAK' },
  ];

  let segsSvg = '';
  segments.forEach((s, i) => {
    const x = marginX + i * colW;
    const labelY = statsTop;
    const valueY = statsTop + 22;
    const subY = statsTop + 38;
    segsSvg += `<text x="${x}" y="${labelY}" fill="${PALETTE.textMuted}" font-size="10.5" letter-spacing="1">${esc(s.label)}</text>\n`;
    segsSvg += `<text x="${x}" y="${valueY}" fill="${i === 2 ? PALETTE.levels[4] : PALETTE.sweep}" font-size="17" font-weight="bold">${esc(s.value)}</text>\n`;
    segsSvg += `<text x="${x}" y="${subY}" fill="${PALETTE.text}" font-size="9.5" opacity="0.75">${esc(s.sub)}</text>\n`;
    if (i > 0) {
      segsSvg += `<line x1="${x - 14}" y1="${statsTop - 12}" x2="${x - 14}" y2="${statsTop + 40}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>\n`;
    }
  });

  const meterY = statsTop + statsH + 8;
  const meterLabel = `CONSISTENCY ${m.consistencyPct}%`;
  const meterLabelW = meterLabel.length * 6.3 + 12;
  const blocks = 28;
  const blockGap = 3;
  const meterAvailW = innerW - meterLabelW;
  const blockW = (meterAvailW - (blocks - 1) * blockGap) / blocks;
  const filled = Math.round((m.consistencyPct / 100) * blocks);
  const meterX = marginX + meterLabelW;

  let meterSvg = `<text x="${marginX}" y="${meterY + 8}" fill="${PALETTE.textMuted}" font-size="10.5" letter-spacing="0.5">${esc(meterLabel)}</text>\n`;
  for (let i = 0; i < blocks; i++) {
    const bx = meterX + i * (blockW + blockGap);
    const fill = i < filled ? PALETTE.sweep : PALETTE.gridBase;
    meterSvg += `<rect x="${bx.toFixed(2)}" y="${meterY}" width="${blockW.toFixed(2)}" height="9" rx="1.5" fill="${fill}" stroke="${PALETTE.gridBorder}" stroke-width="0.5"/>\n`;
  }

  const innerSvg = `
  <text x="${marginX}" y="20" fill="${PALETTE.sweep}" font-size="11" letter-spacing="0.5">STATUS://LOADOUT</text>
  <line x1="${marginX}" y1="${headerH - 4}" x2="${width - marginX}" y2="${headerH - 4}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${segsSvg}
  <line x1="${marginX}" y1="${statsTop + statsH - 4}" x2="${width - marginX}" y2="${statsTop + statsH - 4}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${meterSvg}`;

  return { innerSvg, width, height };
}

export function renderStatsSVG(m, opts = {}) {
  const { innerSvg, width, height } = statsBody(m, opts);
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
