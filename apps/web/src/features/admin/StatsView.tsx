import { Card, Icon, PageIntro, StatCard, StatGrid } from '../../components/ui';
import { ADMIN_SUBSCRIPTIONS, ADMIN_USERS, MOCK_COMMUNITIES, OPS_EVENTS } from '../../lib/mock';
import { theme } from '../../theme';

const GROWTH = [
  { m: 'Jan', v: 42 },
  { m: 'Feb', v: 58 },
  { m: 'Mar', v: 75 },
  { m: 'Apr', v: 96 },
  { m: 'May', v: 128 },
  { m: 'Jun', v: 164 },
];

export function StatsView() {
  const mrr = ADMIN_SUBSCRIPTIONS.reduce((s, x) => s + (x.status === 'active' ? x.mrr : 0), 0);
  const max = Math.max(...GROWTH.map((g) => g.v));

  return (
    <div>
      <PageIntro subtitle="Octergo-wide metrics and health" />

      <StatGrid>
        <StatCard label="Total users" value={ADMIN_USERS.length * 36} color={theme.accent} icon={<Icon name="users" size={18} color={theme.accent} />} sub="+12% this month" />
        <StatCard label="Communities" value={MOCK_COMMUNITIES.length * 47} color={theme.blue} icon={<Icon name="box" size={18} color={theme.blue} />} sub="+8% this month" />
        <StatCard label="MRR" value={`$${(mrr * 36).toFixed(0)}`} color={theme.green} icon={<Icon name="card" size={18} color={theme.green} />} sub="Monthly recurring" />
        <StatCard label="Open incidents" value={OPS_EVENTS.filter((e) => e.level === 'error').length} color={theme.red} icon={<Icon name="warning" size={18} color={theme.red} />} sub="Needs attention" />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
        <Card padding="1.5rem">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 20 }}>User growth (6 months)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
            {GROWTH.map((g) => (
              <div key={g.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{g.v}</div>
                <div style={{ width: '100%', height: `${(g.v / max) * 120}px`, borderRadius: 6, background: theme.gradient }} />
                <div style={{ fontSize: 11, color: theme.textDim }}>{g.m}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="1.5rem">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Plan distribution</div>
          {[
            { label: 'Starter', pct: 52, color: theme.blue },
            { label: 'Pro', pct: 36, color: theme.accent },
            { label: 'Enterprise', pct: 12, color: theme.accentBright },
          ].map((p) => (
            <div key={p.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: theme.textMuted }}>{p.label}</span>
                <span style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{p.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
