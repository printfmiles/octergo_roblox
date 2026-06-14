import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color: string;
  dot?: boolean;
  solid?: boolean;
}

export function Badge({ children, color, dot, solid }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        fontWeight: 600,
        color: solid ? '#fff' : color,
        background: solid ? color : `${color}1a`,
        border: solid ? 'none' : `1px solid ${color}33`,
        padding: '3px 10px',
        borderRadius: 20,
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: solid ? '#fff' : color,
          }}
        />
      )}
      {children}
    </span>
  );
}
