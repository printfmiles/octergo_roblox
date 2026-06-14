import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface StatCardProps {
  label: string;
  value: ReactNode;
  color?: string;
  icon?: ReactNode;
  sub?: ReactNode;
}

export function StatCard({ label, value, color = theme.accent, icon, sub }: StatCardProps) {
  return (
    <div
      style={{
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        padding: '1.1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: theme.textDim, fontWeight: 500 }}>{label}</span>
        {icon && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${color}12`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: theme.textBright, letterSpacing: '-1px' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: theme.textDim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

interface StatGridProps {
  children: ReactNode;
  columns?: number;
}

export function StatGrid({ children, columns = 4 }: StatGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${Math.floor(960 / columns)}px, 1fr))`,
        gap: 12,
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  );
}
