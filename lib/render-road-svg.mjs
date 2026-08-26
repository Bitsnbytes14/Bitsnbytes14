// render-road-svg.mjs
// A thin road band for the bottom of the console card: horizon glow,
// asphalt, animated dashed centre line, and a generic side-profile car
// driving left to right with headlight throw and a soft underglow.
// Pure vector, no images.

import { PALETTE } from './theme.mjs';

export function roadBody(opts = {}) {
  const width = opts.width || 900;
  const height = 68;
  const DRIVE_DUR = 9;

  // Generic car silhouette, drawn around its own origin at road level.
  // Deliberately not modelled on any specific make — a plain coupe shape.
  const car = `
  <g>
    <!-- underglow -->
    <ellipse cx="0" cy="1" rx="30" ry="4" fill="${PALETTE.sweep}" opacity="0.12"/>
    <!-- headlight throw, forward (right) -->
    <path d="M24,-7 L64,-14 L64,-1 L24,-3 Z" fill="${PALETTE.snow}" opacity="0.07"/>
    <!-- body -->
    <path d="M-26,-1 L-24,-9 L-12,-10 L-4,-17 L10,-17 L18,-10 L26,-9 L27,-1 Z"
      fill="${PALETTE.rock}" stroke="${PALETTE.textMuted}" stroke-width="1" stroke-linejoin="round"/>
    <!-- glasshouse -->
    <path d="M-10,-10 L-3,-15 L9,-15 L15,-10 Z" fill="${PALETTE.panel}" opacity="0.9"/>
    <!-- tail light -->
    <rect x="-26.5" y="-7" width="3" height="2.6" rx="1" fill="#ff5f56" opacity="0.95"/>
    <!-- head light -->
    <rect x="23.5" y="-7.5" width="3.5" height="2.6" rx="1" fill="${PALETTE.snow}" opacity="0.95"/>
    <!-- wheels -->
    <circle cx="-15" cy="-1" r="4.2" fill="#05080c" stroke="${PALETTE.textMuted}" stroke-width="1"/>
    <circle cx="15" cy="-1" r="4.2" fill="#05080c" stroke="${PALETTE.textMuted}" stroke-width="1"/>
    <animateTransform attributeName="transform" type="translate"
      values="-90,0; ${width + 90},0" dur="${DRIVE_DUR}s" repeatCount="indefinite"/>
  </g>`;

  // Dashed centre line, scrolling right-to-left to imply forward motion
  const dashes = `
  <g>
    <line x1="0" y1="52" x2="${width + 60}" y2="52"
      stroke="${PALETTE.textMuted}" stroke-width="1.6"
      stroke-dasharray="16 18" opacity="0.45">
      <animate attributeName="stroke-dashoffset" values="34;0" dur="1.1s" repeatCount="indefinite"/>
    </line>
  </g>`;

  const innerSvg = `
  <defs>
    <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PALETTE.panel}"/>
      <stop offset="100%" stop-color="#070b11"/>
    </linearGradient>
    <linearGradient id="horizonGlow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PALETTE.sweep}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${PALETTE.sweep}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${PALETTE.sweep}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#roadGrad)"/>
  <rect x="0" y="30" width="${width}" height="1.2" fill="url(#horizonGlow)"/>
  ${dashes}
  <g transform="translate(0,44)">${car}</g>`;

  return { innerSvg, width, height };
}
