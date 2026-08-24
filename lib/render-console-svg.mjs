// render-console-svg.mjs
// Stacks the identity, stats, and radar bodies inside ONE shared border —
// single set of corner brackets, single background, one vertical accent
// line ("spine") running the full height to visually tie the sections
// together, instead of three separate boxes with gaps.

import { PALETTE, radarBody } from './render-radar-svg.mjs';
import { identityBody } from './render-identity-svg.mjs';
import { statsBody } from './render-stats-svg.mjs';

export function renderConsoleSVG({ weeks, radarOpts = {}, profile, statsMetrics, footer = '' }) {
  const radar = radarBody(weeks, radarOpts);
  const width = radar.width;

  const identity = identityBody(profile, { width });
  const stats = statsBody(statsMetrics, { width });

  const topPad = 14;
  const sectionGap = 8;
  const bottomPad = 16;

  let y = topPad;
  const identityY = y;
  y += identity.height + sectionGap;
  const statsY = y;
  y += stats.height + sectionGap;
  const radarY = y;
  y += radar.height;

  const footerH = footer ? 30 : 0;
  const footerY = y + 10;
  const totalHeight = y + footerH + bottomPad;

  const spineX = 10;
  const spine = `<line x1="${spineX}" y1="${topPad + 4}" x2="${spineX}" y2="${footerY - 6}" stroke="${PALETTE.sweep}" stroke-width="1.2" opacity="0.35"/>`;

  const footerSvg = footer ? `
  <line x1="24" y1="${footerY}" x2="${width - 24}" y2="${footerY}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  <text x="${width / 2}" y="${footerY + 17}" fill="${PALETTE.textMuted}" font-size="10.5" letter-spacing="1" text-anchor="middle">${footer}</text>` : '';

  const bx0 = 4, by0 = 4, bx1 = width - 4, by1 = totalHeight - 4, bl = 10;
  const corners = `
<g stroke="${PALETTE.textMuted}" stroke-width="1.2" fill="none" opacity="0.7">
  <path d="M${bx0},${by0 + bl} L${bx0},${by0} L${bx0 + bl},${by0}"/>
  <path d="M${bx1 - bl},${by0} L${bx1},${by0} L${bx1},${by0 + bl}"/>
  <path d="M${bx0},${by1 - bl} L${bx0},${by1} L${bx0 + bl},${by1}"/>
  <path d="M${bx1 - bl},${by1} L${bx1},${by1} L${bx1},${by1 - bl}"/>
</g>`;

  return `<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg" font-family="'JetBrains Mono','Fira Code',ui-monospace,Menlo,Consolas,monospace">
  <rect x="0" y="0" width="${width}" height="${totalHeight}" rx="8" fill="${PALETTE.bg}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${spine}
  <g transform="translate(0,${identityY})">${identity.innerSvg}</g>
  <g transform="translate(0,${statsY})">${stats.innerSvg}</g>
  <g transform="translate(0,${radarY})">${radar.innerSvg}</g>
  ${footerSvg}
  ${corners}
</svg>`;
}
