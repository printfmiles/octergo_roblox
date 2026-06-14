import { Card, Icon, PageIntro, StatCard, StatGrid } from '../../components/ui';
import { useStore } from '../../lib/store';
import { theme } from '../../theme';

const WEEK = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 19 },
  { day: 'Wed', value: 8 },
  { day: 'Thu', value: 24 },
  { day: 'Fri', value: 31 },
  { day: 'Sat', value: 27 },
  { day: 'Sun', value: 15 },
];

export function ActivityView() {
  const { logs, members } = useStore();
  const max = Math.max(...WEEK.map((w) => w.value));

  const breakdown = [
    { label: 'Promotions', count: logs.filter((l) => l.action === 'promote').length, color: theme.green },
    { label: 'Demotions', count: logs.filter((l) => l.action === 'demote').length, color: theme.orange },
    { label: 'Warnings', count: logs.filter((l) => l.action === 'warn').length, color: theme.amber },
    { label: 'Terminations', count: logs.filter((l) => l.action === 'terminate').length, color: theme.red },
    { label: 'Role syncs', count: logs.filter((l) => l.action === 'sync').length, color: theme.blue },
  ];

  // Quota: PRO = 1000 logs/mo
  const used = 137 + logs.length;
  const quota = 1000;
  const pct = Math.min(100, Math.round((used / quota) * 100));

  return (
    <div>
      <PageIntro title="Activity" subtitle="Action analytics and monthly quota usage" />

      <StatGrid>
        <StatCard label="Actions (7d)" value={136} color={theme.accent} icon={<Icon name="activity" size={18} color={theme.accent} />} />
        <StatCard label="Active members" value={members.filter((m) => m.status === 'active').length} color={theme.green} icon={<Icon name="users" size={18} color={theme.green} />} />
        <StatCard label="Avg / day" value={19} color={theme.blue} icon={<Icon name="trend" size={18} color={theme.blue} />} />
        <StatCard label="Quota used" value={`${pct}%`} color={theme.amber} sub={`${used} / ${quota} logs`} icon={<Icon name="file" size={18} color={theme.amber} />} />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
        <Card padding="1.5rem">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Actions this week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
            {WEEK.map((w) => (
              <div key={w.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{w.value}</div>
                <div
                  style={{
                    width: '100%',
                    height: `${(w.value / max) * 120}px`,
                    borderRadius: 6,
                    background: theme.gradient,
                  }}
                />
                <div style={{ fontSize: 11, color: theme.textDim }}>{w.day}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="1.5rem">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Action breakdown</div>
          {breakdown.map((b) => (
            <div key={b.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: theme.textMuted }}>{b.label}</span>
                <span style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{b.count}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, b.count * 18 + 6)}%`,
                    background: b.color,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: theme.textFaint }}>Monthly log quota</span>
              <span style={{ fontSize: 12, color: theme.textMuted }}>{used} / {quota}</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: theme.gradient, borderRadius: 4 }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
