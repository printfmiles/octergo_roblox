import { useState } from 'react';
import { PageIntro } from '../../components/ui';
import { OPS_EVENTS, type OpsEvent } from '../../lib/mock';
import { theme } from '../../theme';

const LEVEL_META: Record<OpsEvent['level'], { color: string; label: string }> = {
  info: { color: theme.blue, label: 'INFO' },
  warn: { color: theme.amber, label: 'WARN' },
  error: { color: theme.red, label: 'ERROR' },
};

const FILTERS = ['all', 'error', 'warn', 'info'] as const;

export function AdminLogsView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');
  const filtered = filter === 'all' ? OPS_EVENTS : OPS_EVENTS.filter((e) => e.level === filter);

  return (
    <div>
      <PageIntro subtitle="Platform operational events and error stream" />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${filter === f ? theme.accentBorder : theme.border}`,
              background: filter === f ? theme.accentSoft : 'transparent',
              color: filter === f ? theme.accent : theme.textFaint,
              fontSize: 12,
              fontWeight: filter === f ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div
        style={{
          background: theme.bgCard,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          overflow: 'hidden',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        {filtered.map((e) => {
          const m = LEVEL_META[e.level];
          return (
            <div
              key={e.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '0.75rem 1.25rem',
                borderBottom: `1px solid rgba(255,255,255,0.03)`,
              }}
            >
              <span style={{ fontSize: 11, color: theme.textDimmer, width: 70, flexShrink: 0 }}>{e.time}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: m.color,
                  background: `${m.color}1a`,
                  padding: '2px 8px',
                  borderRadius: 5,
                  width: 52,
                  textAlign: 'center',
                  flexShrink: 0,
                }}
              >
                {m.label}
              </span>
              <span style={{ fontSize: 12, color: theme.accent, width: 130, flexShrink: 0 }}>{e.service}</span>
              <span style={{ fontSize: 12, color: theme.textMuted, flex: 1 }}>{e.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
