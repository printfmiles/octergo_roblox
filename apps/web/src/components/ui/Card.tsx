import type { CSSProperties, ReactNode } from 'react';
import { theme } from '../../theme';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  padding?: number | string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, style, padding = '1.25rem', hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: 14,
        padding,
        transition: 'border-color .15s',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      onMouseEnter={
        hover
          ? (e) => (e.currentTarget.style.borderColor = theme.accentBorder)
          : undefined
      }
      onMouseLeave={
        hover ? (e) => (e.currentTarget.style.borderColor = theme.border) : undefined
      }
    >
      {children}
    </div>
  );
}

interface SectionTitleProps {
  title: string;
  count?: number | string;
  action?: ReactNode;
}

export function SectionTitle({ title, count, action }: SectionTitleProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 700, color: theme.textBright, letterSpacing: '-0.2px' }}>
        {title}
      </span>
      {count !== undefined && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme.textDim,
            background: 'rgba(255,255,255,0.05)',
            padding: '1px 8px',
            borderRadius: 10,
          }}
        >
          {count}
        </span>
      )}
      {action && <div style={{ marginLeft: 'auto' }}>{action}</div>}
    </div>
  );
}
