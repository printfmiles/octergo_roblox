import { useState } from 'react';
import { Icon, PageIntro, useToast } from '../../components/ui';
import type { IconName } from '../../components/ui';
import { useStore, type DashboardLog } from '../../lib/store';
import { theme } from '../../theme';

type LogAction = DashboardLog['action'];

const ACTION_ICON: Record<string, IconName> = {
  promote: 'arrowUp',
  demote: 'arrowDown',
  warn: 'warning',
  terminate: 'x',
  sync: 'sync',
  login: 'check',
};

const LABEL: Record<string, string> = {
  promote: 'Promoted',
  demote: 'Demoted',
  warn: 'Warned',
  terminate: 'Terminated',
  sync: 'Synced',
  login: 'Signed in',
};

const FILTERS: { id: 'all' | LogAction; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'promote', label: 'Promotions' },
  { id: 'demote', label: 'Demotions' },
  { id: 'warn', label: 'Warnings' },
  { id: 'terminate', label: 'Terminations' },
  { id: 'sync', label: 'Syncs' },
];

export function AuditLogsView() {
  const toast = useToast();
  const { logs } = useStore();
  const [filter, setFilter] = useState<'all' | LogAction>('all');

  const filtered = filter === 'all' ? logs : logs.filter((l) => l.action === filter);

  return (
    <div>
      <PageIntro
        title="Audit Logs"
        subtitle="A complete trail of every action taken in your community"
        action={
          <button
            onClick={() => toast('Audit log exported (CSV)')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 18px',
              borderRadius: 10,
              border: `1px solid ${theme.borderStrong}`,
              background: 'transparent',
              color: theme.textMuted,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <Icon name="file" size={14} color={theme.textMuted} />
            Export
          </button>
        }
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${filter === f.id ? theme.accentBorder : theme.border}`,
              background: filter === f.id ? theme.accentSoft : 'transparent',
              color: filter === f.id ? theme.accent : theme.textFaint,
              fontSize: 12,
              fontWeight: filter === f.id ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, overflow: 'hidden' }}>
        {filtered.map((l) => (
          <div
            key={l.id}
            style={{
              padding: '0.85rem 1.25rem',
              borderBottom: `1px solid rgba(255,255,255,0.03)`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: `${l.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name={ACTION_ICON[l.action]} size={15} color={l.color} strokeWidth={2.2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: theme.text }}>
                <span style={{ color: theme.textDim }}>{l.executor}</span> {LABEL[l.action]}{' '}
                <span style={{ fontWeight: 600, color: '#fff' }}>{l.target}</span>
              </div>
              <div style={{ fontSize: 12, color: theme.textDim }}>{l.detail}</div>
            </div>
            <span style={{ fontSize: 11, color: theme.textDimmer }}>{l.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
