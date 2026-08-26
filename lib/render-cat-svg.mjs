// render-cat-svg.mjs
// A small generic cat sitting at the bottom of the card, waving one paw.
// Original simple vector shapes — no reference to any existing character.

import { PALETTE } from './theme.mjs';

export function catBody(opts = {}) {
  const width = opts.width || 900;
  const height = 62;
  const cx = width / 2;
  const baseY = 52; // ground line the cat sits on

  const furStroke = PALETTE.textMuted;
  const furFill = PALETTE.rock;

  const cat = `
  <g transform="translate(${cx},${baseY})">
    <!-- soft glow under the cat -->
    <ellipse cx="0" cy="1" rx="22" ry="4" fill="${PALETTE.sweep}" opacity="0.10"/>

    <!-- tail, curling right with a slow sway -->
    <path d="M11,-4 C20,-4 22,-11 17,-15" fill="none"
      stroke="${furStroke}" stroke-width="2.2" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate"
        values="-6 11 -4; 6 11 -4; -6 11 -4" dur="3.2s" repeatCount="indefinite"/>
    </path>

    <!-- body: a rounded sitting shape -->
    <path d="M-12,0 C-13,-14 -7,-20 0,-20 C7,-20 13,-14 12,0 Z"
      fill="${furFill}" stroke="${furStroke}" stroke-width="1.4" stroke-linejoin="round"/>

    <!-- head -->
    <circle cx="0" cy="-25" r="9.5" fill="${furFill}" stroke="${furStroke}" stroke-width="1.4"/>
    <!-- ears -->
    <path d="M-8,-31 L-9,-38 L-2.5,-33 Z" fill="${furFill}" stroke="${furStroke}" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M8,-31 L9,-38 L2.5,-33 Z" fill="${furFill}" stroke="${furStroke}" stroke-width="1.3" stroke-linejoin="round"/>

    <!-- eyes: blink occasionally -->
    <g fill="${PALETTE.sweep}">
      <ellipse cx="-3.6" cy="-26" rx="1.5" ry="1.9">
        <animate attributeName="ry" values="1.9;1.9;0.2;1.9;1.9" keyTimes="0;0.92;0.95;0.98;1" dur="4.5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="3.6" cy="-26" rx="1.5" ry="1.9">
        <animate attributeName="ry" values="1.9;1.9;0.2;1.9;1.9" keyTimes="0;0.92;0.95;0.98;1" dur="4.5s" repeatCount="indefinite"/>
      </ellipse>
    </g>
    <!-- nose + mouth -->
    <path d="M0,-23 L-1.4,-21.6 M0,-23 L1.4,-21.6" stroke="${furStroke}" stroke-width="1" stroke-linecap="round" fill="none"/>
    <!-- whiskers -->
    <g stroke="${furStroke}" stroke-width="0.9" stroke-linecap="round" opacity="0.8">
      <path d="M-6,-23 L-14,-24.5"/>
      <path d="M-6,-21.5 L-14,-21"/>
      <path d="M6,-23 L14,-24.5"/>
      <path d="M6,-21.5 L14,-21"/>
    </g>

    <!-- resting paw -->
    <ellipse cx="-6" cy="-1.5" rx="4" ry="2.8" fill="${furFill}" stroke="${furStroke}" stroke-width="1.2"/>

    <!-- waving paw: raised, rotating from the shoulder -->
    <g>
      <path d="M9,-11 L15,-18" stroke="${furStroke}" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <ellipse cx="16" cy="-19.5" rx="3.6" ry="3" fill="${furFill}" stroke="${furStroke}" stroke-width="1.2"/>
      <animateTransform attributeName="transform" type="rotate"
        values="-16 9 -11; 12 9 -11; -16 9 -11" dur="1.1s" repeatCount="indefinite"/>
    </g>
  </g>`;

  return { innerSvg: cat, width, height };
}
