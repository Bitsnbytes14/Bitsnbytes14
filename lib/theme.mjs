export const PALETTE = {
  bg: '#0a0e14',
  panel: '#0d131b',
  gridBorder: '#1f2833',
  text: '#c9d6e3',
  textMuted: '#5b6b7c',
  sweep: '#5ee6d8',
  sweepGlow: '#2fb8ab',
  accent: '#ffb454',
  snow: '#dce9f5',
  rock: '#161f2b',
  rockFar: '#111823',
};

export function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
