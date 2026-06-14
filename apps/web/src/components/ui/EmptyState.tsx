import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface EmptyStateProps {
  title: string;
  hint?: string;
  action?: ReactNode;
  dashed?: boolean;
}

export function EmptyState({ title, hint, action, dashed = true }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        background: theme.bgCard,
        border: dashed ? `1px dashed ${theme.border}` : `1px solid ${theme.border}`,
        borderRadius: 14,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: theme.textFaint, marginBottom: 6 }}>
        {title}
      </div>
      {hint && <div style={{ fontSize: 13, color: theme.textDimmer, marginBottom: 12 }}>{hint}</div>}
      {action}
    </div>
  );
}
