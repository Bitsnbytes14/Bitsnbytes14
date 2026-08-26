// render-mountain-svg.mjs
// Night mountain viewport: layered ridges, an animated ascent route, a
// climber on the route, and a summit marker. Pure vector, no images.

import { PALETTE } from './theme.mjs';

export function mountainBody(opts = {}) {
  const width = opts.width || 900;
  const height = 300;
  const S = width / 900;
  const x = (n) => (n * S).toFixed(1);

  const starSeeds = [
    [70, 44, 1.1, 0], [140, 78, 0.9, 1.3], [215, 34, 1.3, 2.1], [300, 64, 1.0, 0.7],
    [380, 30, 1.2, 1.8], [470, 70, 0.9, 2.6], [545, 40, 1.1, 0.4], [620, 80, 1.0, 1.5],
    [700, 32, 1.3, 2.3], [780, 62, 0.9, 0.9], [845, 38, 1.1, 1.9], [175, 108, 0.8, 2.8],
    [520, 102, 0.9, 1.1], [660, 112, 0.8, 0.3], [250, 130, 0.8, 2.0], [430, 122, 0.9, 1.6],
  ];
  const stars = starSeeds.map(([sx, sy, r, delay]) =>
    `<circle cx="${x(sx)}" cy="${sy}" r="${r}" fill="${PALETTE.snow}" opacity="0.7">
      <animate attributeName="opacity" values="0.15;0.85;0.15" dur="3.4s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>`).join('\n');

  const moon = `
  <circle cx="${x(800)}" cy="56" r="18" fill="${PALETTE.snow}" opacity="0.9"/>
  <circle cx="${x(800)}" cy="56" r="28" fill="${PALETTE.snow}" opacity="0.07"/>
  <circle cx="${x(794)}" cy="50" r="3.5" fill="${PALETTE.rockFar}" opacity="0.25"/>
  <circle cx="${x(806)}" cy="63" r="2.5" fill="${PALETTE.rockFar}" opacity="0.2"/>`;

  // Far ridge pushed much darker so the layering actually reads
  const farRidge = `<polygon points="0,300 ${x(90)},200 ${x(200)},242 ${x(310)},168 ${x(430)},232 ${x(560)},158 ${x(680)},224 ${x(790)},182 ${x(900)},300" fill="#0c121b"/>`;

  // Main massif — peak at (450,64)
  const mainRidge = `<polygon points="${x(20)},300 ${x(210)},158 ${x(320)},206 ${x(450)},64 ${x(585)},190 ${x(670)},144 ${x(880)},300" fill="${PALETTE.rock}"/>`;

  // Snowcap: a triangle sharing the exact peak vertex, base flush on the slopes
  const snowCap = `<polygon points="${x(450)},64 ${x(412)},104 ${x(488)},104" fill="${PALETTE.snow}" opacity="0.9"/>
  <polygon points="${x(450)},64 ${x(430)},88 ${x(450)},80 ${x(468)},90" fill="#ffffff" opacity="0.25"/>`;

  // Route: starts higher, steepens sooner, ends exactly at the peak
  const route = `M ${x(170)},288 C ${x(250)},262 ${x(272)},232 ${x(320)},214 S ${x(378)},176 ${x(404)},142 S ${x(438)},96 ${x(450)},66`;
  const routeSvg = `
  <path id="ascentRoute" d="${route}" fill="none" stroke="${PALETTE.sweep}" stroke-width="1.9" stroke-linecap="round" stroke-dasharray="6 7" opacity="0.75">
    <animate attributeName="stroke-dashoffset" values="140;0" dur="6s" repeatCount="indefinite"/>
  </path>`;

  // Climber: drawn around origin (0,0) so animateMotion can carry it along
  // the route path. Pose is a climbing reach — leaning into the slope, one
  // arm high, legs staggered — not a standing figure. Coordinates are
  // deliberately unscaled (a human figure shouldn't stretch with card width).
  const CLIMB_DUR = 15;
  const climber = `
  <g>
    <g>
      <circle cx="0" cy="0" r="16" fill="${PALETTE.accent}" opacity="0.10">
        <animate attributeName="opacity" values="0.05;0.20;0.05" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      <g stroke="${PALETTE.accent}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <!-- head, tucked forward into the slope -->
        <circle cx="2" cy="-13" r="3.2" fill="${PALETTE.accent}" stroke="none"/>
        <!-- torso, leaning uphill -->
        <path d="M1,-10 L-2,-1"/>
        <!-- lead arm reaching high for the next hold -->
        <path d="M1,-8 L6,-13 L9,-19"/>
        <!-- trailing arm gripping low -->
        <path d="M1,-8 L-5,-10 L-8,-6"/>
        <!-- lead leg driven up, knee bent -->
        <path d="M-2,-1 L4,2 L3,9"/>
        <!-- trailing leg extended back down the slope -->
        <path d="M-2,-1 L-7,5 L-9,12"/>
      </g>
      <animateTransform attributeName="transform" type="rotate"
        values="-4 0 -2; 3 0 -2; -4 0 -2" dur="1.8s" repeatCount="indefinite"/>
    </g>
    <animateMotion dur="${CLIMB_DUR}s" repeatCount="indefinite" rotate="0">
      <mpath href="#ascentRoute" xlink:href="#ascentRoute"/>
    </animateMotion>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.07;0.88;1" dur="${CLIMB_DUR}s" repeatCount="indefinite"/>
  </g>`;

  // Flag pole starts ON the peak vertex (450,64)
  const summit = `
  <line x1="${x(450)}" y1="64" x2="${x(450)}" y2="34" stroke="${PALETTE.sweep}" stroke-width="1.6"/>
  <polygon points="${x(450)},34 ${x(474)},41 ${x(450)},48" fill="${PALETTE.sweep}"/>
  <circle cx="${x(450)}" cy="64" r="3" fill="${PALETTE.sweep}"/>
  <circle cx="${x(450)}" cy="64" r="3" fill="none" stroke="${PALETTE.sweep}" stroke-width="1.2" opacity="0">
    <animate attributeName="r" values="3;26;26" dur="3.2s" repeatCount="indefinite"/>
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
