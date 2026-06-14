export const theme = {
  bg: '#08080d',
  bgDeep: '#0a0a0f',
  bgPanel: '#0c0c14',
  bgCard: 'rgba(255,255,255,0.02)',
  bgCardHover: 'rgba(255,255,255,0.04)',
  bgElevated: '#0d0d16',
  border: 'rgba(255,255,255,0.06)',
  borderStrong: 'rgba(255,255,255,0.1)',
  text: '#e2e8f0',
  textBright: '#ffffff',
  textMuted: '#94a3b8',
  textFaint: '#64748b',
  textDim: '#475569',
  textDimmer: '#334155',
  accent: '#a78bfa',
  accentBright: '#c084fc',
  accentSoft: 'rgba(167,139,250,0.1)',
  accentBorder: 'rgba(167,139,250,0.25)',
  gradient: 'linear-gradient(135deg,#9333ea,#6366f1)',
  gradientSoft: 'linear-gradient(135deg,#c084fc,#818cf8)',
  green: '#22c55e',
  amber: '#f59e0b',
  orange: '#f97316',
  red: '#ef4444',
  blue: '#818cf8',
  cyan: '#06b6d4',
  pink: '#ec4899',
} as const;

export const AVATAR_COLORS = [
  '#818cf8',
  '#a78bfa',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
  '#f97316',
];

export function avatarColor(name: string): string {
  return AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length];
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}
