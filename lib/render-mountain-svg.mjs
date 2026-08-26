// render-mountain-svg.mjs
// A hand-drawn night mountain scene: layered ridges, a dashed ascent route
// that animates upward, a tiny climber partway up, and a summit marker
// that pulses. Entirely vector — no external images, nothing to 404.

import { PALETTE } from './theme.mjs';

export function mountainBody(opts = {}) {
  const width = opts.width || 900;
  const height = 250;
  const S = width / 900; // horizontal scale factor so it adapts to card width
  const x = (n) => (n * S).toFixed(1);

  // Twinkling stars
  const starSeeds = [
    [70, 40, 1.1, 0], [140, 72, 0.9, 1.3], [215, 32, 1.3, 2.1], [300, 60, 1.0, 0.7],
    [380, 28, 1.2, 1.8], [470, 66, 0.9, 2.6], [545, 38, 1.1, 0.4], [620, 74, 1.0, 1.5],
    [700, 30, 1.3, 2.3], [780, 58, 0.9, 0.9], [840, 36, 1.1, 1.9], [175, 100, 0.8, 2.8],
    [520, 96, 0.9, 1.1], [660, 104, 0.8, 0.3],
  ];
  const stars = starSeeds.map(([sx, sy, r, delay]) =>
    `<circle cx="${x(sx)}" cy="${sy}" r="${r}" fill="${PALETTE.snow}" opacity="0.7">
      <animate attributeName="opacity" values="0.15;0.85;0.15" dur="3.4s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>`).join('\n');

  const moon = `
  <circle cx="${x(795)}" cy="52" r="17" fill="${PALETTE.snow}" opacity="0.9"/>
  <circle cx="${x(795)}" cy="52" r="26" fill="${PALETTE.snow}" opacity="0.07"/>
  <circle cx="${x(789)}" cy="47" r="3.5" fill="${PALETTE.rockFar}" opacity="0.25"/>
  <circle cx="${x(801)}" cy="58" r="2.5" fill="${PALETTE.rockFar}" opacity="0.2"/>`;

  // Far ridge, then main massif in front of it
  const farRidge = `<polygon points="0,250 ${x(90)},170 ${x(190)},205 ${x(300)},140 ${x(420)},198 ${x(540)},132 ${x(660)},190 ${x(770)},152 ${x(900)},250" fill="${PALETTE.rockFar}"/>`;
  const mainRidge = `<polygon points="${x(40)},250 ${x(230)},128 ${x(320)},172 ${x(450)},52 ${x(575)},158 ${x(660)},118 ${x(860)},250" fill="${PALETTE.rock}"/>`;

  // Snow cap on the main summit
  const snowCap = `<polygon points="${x(450)},52 ${x(415)},92 ${x(432)},84 ${x(450)},98 ${x(470)},80 ${x(486)},90" fill="${PALETTE.snow}" opacity="0.85"/>`;

  // Dashed ascent route, animated so it reads as "climbing"
  const route = `M ${x(150)},242 C ${x(230)},225 ${x(255)},200 ${x(310)},190 S ${x(365)},160 ${x(392)},130 S ${x(430)},92 ${x(450)},58`;
  const routeSvg = `
  <path d="${route}" fill="none" stroke="${PALETTE.sweep}" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="6 7" opacity="0.75">
    <animate attributeName="stroke-dashoffset" values="130;0" dur="6s" repeatCount="indefinite"/>
  </path>`;

  // Tiny climber partway up the route
  const cx = 392, cy = 130;
  const climber = `
  <g stroke="${PALETTE.accent}" stroke-width="1.6" stroke-linecap="round" fill="none">
    <circle cx="${x(cx)}" cy="${cy - 9}" r="2.2" fill="${PALETTE.accent}" stroke="none"/>
    <path d="M${x(cx)},${cy - 7} L${x(cx)},${cy - 1}"/>
    <path d="M${x(cx)},${cy - 5} L${x(cx - 5)},${cy - 8}"/>
    <path d="M${x(cx)},${cy - 5} L${x(cx + 5)},${cy - 9}"/>
    <path d="M${x(cx)},${cy - 1} L${x(cx - 4)},${cy + 5}"/>
    <path d="M${x(cx)},${cy - 1} L${x(cx + 4)},${cy + 4}"/>
  </g>
  <circle cx="${x(cx)}" cy="${cy - 4}" r="11" fill="${PALETTE.accent}" opacity="0.10">
    <animate attributeName="opacity" values="0.05;0.18;0.05" dur="2.8s" repeatCount="indefinite"/>
  </circle>`;

  // Summit marker + pulse
  const summit = `
  <line x1="${x(450)}" y1="52" x2="${x(450)}" y2="30" stroke="${PALETTE.sweep}" stroke-width="1.4"/>
  <polygon points="${x(450)},30 ${x(470)},36 ${x(450)},42" fill="${PALETTE.sweep}"/>
  <circle cx="${x(450)}" cy="52" r="4" fill="none" stroke="${PALETTE.sweep}" stroke-width="1.2" opacity="0">
    <animate attributeName="r" values="4;22;22" dur="3.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.9;0;0" dur="3.2s" repeatCount="indefinite"/>
  </circle>`;

  const innerSvg = `
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="${PALETTE.panel}"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#skyGrad)"/>
  ${stars}
  ${moon}
  ${farRidge}
  ${mainRidge}
  ${snowCap}
  ${routeSvg}
  ${climber}
  ${summit}`;

  return { innerSvg, width, height };
}
