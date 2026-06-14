import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div
      style={{
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        overflowX: 'auto',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  padding: '11px 14px',
                  fontSize: 11,
                  color: theme.textFaint,
                  textAlign: 'left',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: '11px 14px', fontSize: 13, color: theme.textMuted, ...style }}>
      {children}
    </td>
  );
}

export function Tr({ children }: { children: ReactNode }) {
  return <tr style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>{children}</tr>;
}
