import { useMemo, useState } from 'react';
import { STATUS_COMPONENTS, STATUS_INCIDENTS, STATUS_META } from '../../lib/mock';
import { theme } from '../../theme';

const SEVERITY_META: Record<string, { color: string; label: string }> = {
  minor: { color: theme.amber, label: 'Minor' },
  major: { color: theme.red, label: 'Major' },
  critical: { color: '#dc2626', label: 'Critical' },
};

function UptimeBar() {
  const bars = useMemo(
    () =>
      Array.from({ length: 90 }, () => {
        const r = Math.random();
        return r > 0.985 ? 'degraded' : r > 0.997 ? 'outage' : 'operational';
      }),
    [],
  );
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 28 }}>
      {bars.map((s, i) => (
        <div
          key={i}
          title={`Day ${90 - i}`}
          style={{
            flex: 1,
            height: s === 'operational' ? 20 : s === 'degraded' ? 14 : 10,
            borderRadius: 2,
            background: s === 'operational' ? theme.green : s === 'degraded' ? theme.amber : theme.red,
            opacity: s === 'operational' ? 0.7 : 1,
          }}
        />
      ))}
    </div>
  );
}

export function StatusPage() {
  const [openInc, setOpenInc] = useState<number | null>(null);

  const allOk = STATUS_COMPONENTS.every((c) => c.status === 'operational');
  const hasDegraded = STATUS_COMPONENTS.some((c) => c.status === 'degraded');
  const overall = allOk ? 'operational' : hasDegraded ? 'degraded' : 'outage';
  const overallMeta = STATUS_META[overall];

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem 5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: overallMeta.bg,
            border: `1px solid ${overallMeta.border}`,
            borderRadius: 40,
            padding: '10px 24px',
            marginBottom: 16,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: overallMeta.color, boxShadow: `0 0 8px ${overallMeta.color}` }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: overallMeta.color }}>
            {allOk ? 'All Systems Operational' : hasDegraded ? 'Partial Service Degradation' : 'Major Service Outage'}
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: '0 0 8px', letterSpacing: '-1.5px' }}>
          Octergo Status
        </h1>
        <p style={{ fontSize: 14, color: theme.textFaint, margin: 0 }}>
          Real-time system health · Updates every 30 seconds
        </p>
      </div>

      <div
        style={{
          background: theme.accentSoft,
          border: `1px solid ${theme.accentBorder}`,
          borderRadius: 12,
          padding: '0.9rem 1.25rem',
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 13, color: theme.textMuted }}>
          This page is powered by <strong style={{ color: theme.accent }}>Better Stack</strong> — outages and
          maintenance are published here automatically.
        </span>
        <a
          href="https://betterstack.com/"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13, color: theme.accent, fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          Subscribe to updates →
        </a>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.08em', marginBottom: 14 }}>
          COMPONENTS
        </div>
        <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, overflow: 'hidden' }}>
          {STATUS_COMPONENTS.map((c, i) => {
            const m = STATUS_META[c.status] ?? STATUS_META.operational;
            return (
              <div
                key={c.id}
                style={{
                  padding: '0.9rem 1.25rem',
                  borderBottom: i < STATUS_COMPONENTS.length - 1 ? `1px solid rgba(255,255,255,0.05)` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 14, color: theme.text }}>{c.name}</span>
                <span style={{ fontSize: 12, color: theme.textFaint, marginRight: 16 }}>{c.uptime} uptime</span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: m.color,
                    background: m.bg,
                    border: `1px solid ${m.border}`,
                    padding: '2px 10px',
                    borderRadius: 20,
                  }}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '1.25rem', marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.08em' }}>90-DAY UPTIME</div>
          <div style={{ fontSize: 12, color: theme.textFaint }}>99.94% avg</div>
        </div>
        <UptimeBar />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: theme.textDim }}>90 days ago</span>
          <span style={{ fontSize: 11, color: theme.textDim }}>Today</span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.08em', marginBottom: 14 }}>
          INCIDENTS & MAINTENANCE
        </div>
        {STATUS_INCIDENTS.map((inc) => {
          const sm = SEVERITY_META[inc.severity] ?? SEVERITY_META.minor;
          const resolved = inc.status === 'resolved';
          const isOpen = openInc === inc.id;
          return (
            <div
              key={inc.id}
              onClick={() => setOpenInc(isOpen ? null : inc.id)}
              style={{
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: '1rem 1.25rem',
                marginBottom: 10,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: resolved ? theme.green : sm.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: theme.text }}>{inc.title}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: resolved ? theme.green : sm.color,
                    fontWeight: 600,
                    background: resolved ? 'rgba(34,197,94,0.1)' : `${sm.color}1a`,
                    padding: '2px 10px',
                    borderRadius: 20,
                  }}
                >
                  {resolved ? 'Resolved' : inc.status.charAt(0).toUpperCase() + inc.status.slice(1)}
                </span>
              </div>
              <div style={{ fontSize: 12, color: theme.textDim, marginTop: 4 }}>{inc.time}</div>
              {isOpen && (
                <div style={{ marginTop: 14, borderTop: `1px solid ${theme.border}`, paddingTop: 12 }}>
                  {inc.updates.map((u, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 11, color: theme.textFaint, marginBottom: 2 }}>{u.time}</div>
                      <div style={{ fontSize: 13, color: theme.textMuted }}>{u.msg}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
