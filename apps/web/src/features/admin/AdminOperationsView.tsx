import { useState } from 'react';
import { Card, PageIntro, useToast } from '../../components/ui';
import { STATUS_COMPONENTS, STATUS_META } from '../../lib/mock';
import { theme } from '../../theme';

export function AdminOperationsView() {
  const toast = useToast();
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div style={{ maxWidth: 760 }}>
      <PageIntro subtitle="Platform controls and live service health" />

      <Card
        padding="1.5rem"
        style={{
          marginBottom: 16,
          border: maintenance ? '1px solid rgba(245,158,11,0.35)' : `1px solid ${theme.border}`,
          background: maintenance ? 'rgba(245,158,11,0.06)' : theme.bgCard,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Maintenance mode</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>
              {maintenance
                ? 'The dashboard is currently showing a maintenance banner to all users.'
                : 'Display a maintenance banner and pause background jobs.'}
            </div>
          </div>
          <button
            onClick={() => {
              setMaintenance((m) => !m);
              toast(maintenance ? 'Maintenance mode disabled' : 'Maintenance mode enabled', maintenance ? 'success' : 'error');
            }}
            style={{
              width: 46,
              height: 26,
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              background: maintenance ? theme.amber : 'rgba(255,255,255,0.1)',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: maintenance ? 23 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .15s',
              }}
            />
          </button>
        </div>
      </Card>

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>Service health</div>
        {STATUS_COMPONENTS.map((c, i) => {
          const m = STATUS_META[c.status] ?? STATUS_META.operational;
          return (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '0.7rem 0',
                borderBottom: i < STATUS_COMPONENTS.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color }} />
              <span style={{ flex: 1, fontSize: 13, color: theme.text }}>{c.name}</span>
              <span style={{ fontSize: 12, color: theme.textFaint, marginRight: 12 }}>{c.uptime}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: m.color }}>{m.label}</span>
            </div>
          );
        })}
      </Card>

      <Card padding="1.5rem">
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>Operational actions</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'Flush cache', type: 'ghost' as const },
            { label: 'Restart bot', type: 'ghost' as const },
            { label: 'Re-run failed webhooks', type: 'ghost' as const },
          ].map((b) => (
            <button
              key={b.label}
              onClick={() => toast(`${b.label} triggered`)}
              style={{
                padding: '9px 16px',
                borderRadius: 9,
                border: `1px solid ${theme.borderStrong}`,
                background: 'transparent',
                color: theme.textMuted,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
