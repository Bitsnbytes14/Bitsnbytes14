// render-radar-svg.mjs
// Turns a GitHub-style contribution calendar into an animated "radar
// sweep" SVG body. radarBody() returns just the inner content (no
// background/border/corners) so it can be composed into the merged
// console card. renderRadarSVG() wraps that body standalone.

export const PALETTE = {
  bg: '#0a0e14',
  gridBase: '#131a22',
  gridBorder: '#1f2833',
  text: '#c9d6e3',
  textMuted: '#5b6b7c',
  sweep: '#5ee6d8',
  sweepGlow: '#2fb8ab',
  levels: ['#131a22', '#12393c', '#1b6e70', '#33b6b0', '#ffb454'],
};

function levelForCount(count, max) {
  if (count <= 0) return 0;
  if (max <= 0) return 1;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.2) return 2;
  return 1;
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function radarBody(weeks, opts = {}) {
  const {
    title = 'CONTRIB://RADAR_SCAN',
    subtitle = '',
    duration = 22,
  } = opts;

  const cell = 11;
  const gap = 3;
  const marginX = 24;
  const headerH = 34;
  const footerH = 16;
  const weeksCount = weeks.length;
  const gridW = weeksCount * cell + (weeksCount - 1) * gap;
  const gridH = 7 * cell + 6 * gap;
  const width = marginX * 2 + gridW;
  const height = headerH + gridH + footerH + 20;

  const gridX = marginX;
  const gridY = headerH + 10;

  const maxCount = weeks.reduce(
    (m, w) => Math.max(m, ...w.map((d) => d.count)), 0,
  );

  let cellsSvg = '';
  let pingsSvg = '';

  weeks.forEach((week, c) => {
    const frac = weeksCount > 1 ? c / (weeksCount - 1) : 0;
    const before = Math.max(0, frac - 0.018);
    const after = Math.min(1, frac + 0.06);

    week.forEach((day, r) => {
      const x = gridX + c * (cell + gap);
      const y = gridY + r * (cell + gap);
      const level = levelForCount(day.count, maxCount);
      const baseFill = PALETTE.levels[level];

      if (level === 0) {
        cellsSvg += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" fill="${baseFill}" stroke="${PALETTE.gridBorder}" stroke-width="0.5"/>\n`;
        return;
      }

      const peakOpacity = level >= 3 ? 1 : 0.85;
      const keyTimes = `0;${before.toFixed(4)};${frac.toFixed(4)};${after.toFixed(4)};1`;
      const values = `0.42;0.42;${peakOpacity};0.55;0.42`;

      cellsSvg += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" fill="${baseFill}" stroke="${PALETTE.gridBorder}" stroke-width="0.5">
  <animate attributeName="opacity" dur="${duration}s" repeatCount="indefinite" calcMode="linear" keyTimes="${keyTimes}" values="${values}"/>
</rect>\n`;

      if (level >= 3) {
        const cx = x + cell / 2;
        const cy = y + cell / 2;
        const ringColor = level === 4 ? PALETTE.levels[4] : PALETTE.levels[3];
        const rBegin = Math.max(0, frac - 0.004) * duration;
        pingsSvg += `<circle cx="${cx}" cy="${cy}" r="${cell / 2}" fill="none" stroke="${ringColor}" stroke-width="1.1" opacity="0">
  <animate attributeName="r" dur="${duration}s" begin="${rBegin.toFixed(3)}s" repeatCount="indefinite" keyTimes="0;0.02;0.14;1" values="${cell / 2};${cell / 2};${cell * 1.6};${cell * 1.6}" calcMode="spline" keySplines="0.2 0 0.4 1;0.2 0 0.4 1;0 0 1 1"/>
  <animate attributeName="opacity" dur="${duration}s" begin="${rBegin.toFixed(3)}s" repeatCount="indefinite" keyTimes="0;0.02;0.14;1" values="0;0.85;0;0"/>
</circle>\n`;
      }
    });
  });

  const sweepTravel = gridW;
  const sweepSvg = `
<g>
  <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${PALETTE.sweepGlow}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${PALETTE.sweep}" stop-opacity="0.55"/>
  </linearGradient>
  <g transform="translate(${gridX},${gridY})">
    <rect x="-46" y="-4" width="46" height="${gridH + 8}" fill="url(#trailGrad)">
      <animateTransform attributeName="transform" type="translate" dur="${duration}s" repeatCount="indefinite" values="0,0; ${sweepTravel},0; 0,0" keyTimes="0;0.98;1" calcMode="linear"/>
    </rect>
    <rect x="-1.5" y="-4" width="3" height="${gridH + 8}" fill="${PALETTE.sweep}" opacity="0.9">
      <animateTransform attributeName="transform" type="translate" dur="${duration}s" repeatCount="indefinite" values="0,0; ${sweepTravel},0; 0,0" keyTimes="0;0.98;1" calcMode="linear"/>
    </rect>
  </g>
</g>`;

  const blinkCursor = `<rect x="${width - marginX - 8}" y="${headerH / 2 - 6}" width="6" height="11" fill="${PALETTE.sweep}">
  <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" keyTimes="0;0.5;0.51;1" repeatCount="indefinite"/>
</rect>`;

  const innerSvg = `
  <text x="${marginX}" y="20" fill="${PALETTE.sweep}" font-size="12" letter-spacing="0.5">${esc(title)}</text>
  ${subtitle ? `<text x="${width - marginX}" y="20" fill="${PALETTE.textMuted}" font-size="10.5" text-anchor="end">${esc(subtitle)}</text>` : ''}
  ${blinkCursor}
  <line x1="${marginX}" y1="27" x2="${width - marginX}" y2="27" stroke="${PALETTE.gridBorder}" stroke-width="1"/>
  <g>${cellsSvg}</g>
  ${sweepSvg}
  <g>${pingsSvg}</g>`;

  return { innerSvg, width, height };
}

export function renderRadarSVG(weeks, opts = {}) {
  const { innerSvg, width, height } = radarBody(weeks, opts);
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
