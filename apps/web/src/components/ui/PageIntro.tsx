import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface PageIntroProps {
  /** Omit when the layout header already shows the page name (e.g. dashboard sidebar). */
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageIntro({ title, subtitle, action }: PageIntroProps) {
  if (!title && !subtitle && !action) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
      }}
    >
      <div>
        {title && (
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: theme.textBright, letterSpacing: '-0.3px' }}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            style={{
              margin: title ? '4px 0 0' : 0,
              color: theme.textFaint,
              fontSize: 13,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
