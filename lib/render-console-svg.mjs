// render-console-svg.mjs
// One frame: title band, mountain scene, identity/stack/seeking, footer.
// Fully static — no network calls, no live data, nothing to break.

import { PALETTE, esc } from './theme.mjs';
import { mountainBody } from './render-mountain-svg.mjs';
import { identityBody } from './render-identity-svg.mjs';
import { catBody } from './render-cat-svg.mjs';

export function renderConsoleSVG(profile, opts = {}) {
  const width = opts.width || 900;
  const marginX = 26;

  const topPad = 14;
  const titleH = 74;
  const gap = 14;
  const footerH = 30;
  const bottomPad = 16;

  const mountain = mountainBody({ width });
  const identity = identityBody(profile, { width });

  let y = topPad;
  const titleY = y;
  y += titleH;
  const mountainY = y;
  y += mountain.height + gap;
  const identityY = y;
  y += identity.height;
  const footerY = y + 8;
  const cat = catBody({ width });
  const catY = footerY + footerH + 2;
  const totalHeight = catY + cat.height + 6;

  const handle = (profile.links?.find(([k]) => k === 'github')?.[1] || '')
    .split('/').pop().toUpperCase();

  const titleSvg = `
  <text x="${marginX}" y="${titleY + 34}" fill="${PALETTE.sweep}" font-size="26" font-weight="bold" letter-spacing="2">&gt;_&lt; ${esc(handle)}</text>
  <text x="${marginX}" y="${titleY + 57}" fill="${PALETTE.textMuted}" font-size="11.5" letter-spacing="1.6">${esc((profile.tagline || '').toUpperCase())}</text>
  <line x1="${marginX}" y1="${titleY + 68}" x2="${width - marginX}" y2="${titleY + 68}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>`;

  const footerSvg = `
  <line x1="${marginX}" y1="${footerY}" x2="${width - marginX}" y2="${footerY}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  <text x="${width / 2}" y="${footerY + 18}" fill="${PALETTE.textMuted}" font-size="10.5" letter-spacing="1.4" text-anchor="middle">${esc(profile.footer || 'THE SUMMIT IS JUST ONE MORE COMMIT AWAY')}</text>`;

  const b = 4, bl = 12;
  const corners = `
  <g stroke="${PALETTE.textMuted}" stroke-width="1.2" fill="none" opacity="0.7">
    <path d="M${b},${b + bl} L${b},${b} L${b + bl},${b}"/>
    <path d="M${width - b - bl},${b} L${width - b},${b} L${width - b},${b + bl}"/>
    <path d="M${b},${totalHeight - b - bl} L${b},${totalHeight - b} L${b + bl},${totalHeight - b}"/>
    <path d="M${width - b - bl},${totalHeight - b} L${width - b},${totalHeight - b} L${width - b},${totalHeight - b - bl}"/>
  </g>`;

  return `<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" font-family="'JetBrains Mono','Fira Code',ui-monospace,Menlo,Consolas,monospace">
  <rect x="0" y="0" width="${width}" height="${totalHeight}" rx="8" fill="${PALETTE.bg}" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  ${titleSvg}
  <g transform="translate(0,${mountainY})"><svg x="0" y="0" width="${width}" height="${mountain.height}" viewBox="0 0 ${width} ${mountain.height}">${mountain.innerSvg}</svg></g>
  <polygon points="0,${identityY - 26} ${width * 0.28},${identityY - 4} ${width * 0.52},${identityY - 20} ${width * 0.74},${identityY - 2} ${width},${identityY - 24} ${width},${identityY + 10} 0,${identityY + 10}" fill="${PALETTE.rock}" opacity="0.35"/>
  <g transform="translate(0,${identityY})">${identity.innerSvg}</g>
  ${footerSvg}
  <g transform="translate(0,${catY})">${cat.innerSvg}</g>
  ${corners}
</svg>`;
}
