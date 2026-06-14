import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { theme } from '../../theme';

type Variant = 'primary' | 'ghost' | 'soft' | 'danger' | 'white';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md';
  full?: boolean;
}

const variants: Record<Variant, CSSProperties> = {
  primary: {
    background: theme.gradient,
    color: '#fff',
    border: 'none',
  },
  white: {
    background: '#fff',
    color: theme.bg,
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: theme.textMuted,
    border: `1px solid ${theme.borderStrong}`,
  },
  soft: {
    background: theme.accentSoft,
    color: theme.accent,
    border: `1px solid ${theme.accentBorder}`,
  },
  danger: {
    background: 'rgba(239,68,68,0.08)',
    color: theme.red,
    border: '1px solid rgba(239,68,68,0.3)',
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  full,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: size === 'sm' ? '6px 14px' : '9px 18px',
        borderRadius: 10,
        fontSize: size === 'sm' ? 12 : 13,
        fontWeight: 700,
        cursor: rest.disabled ? 'not-allowed' : 'pointer',
        opacity: rest.disabled ? 0.6 : 1,
        width: full ? '100%' : undefined,
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
