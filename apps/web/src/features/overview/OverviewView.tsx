import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';
import { Card, Icon, StatCard, StatGrid } from '../../components/ui';
import { MOCK_LOGS, MOCK_MEMBERS } from '../../lib/mock';
import { theme } from '../../theme';

const plan = SubscriptionPlan.PRO;

export function OverviewView() {
  const stats = {
    total: MOCK_MEMBERS.length,
    active: MOCK_MEMBERS.filter((m) => m.status === 'active').length,
    warned: MOCK_MEMBERS.filter((m) => m.status === 'warned').length,
    terminated: MOCK_MEMBERS.filter((m) => m.status === 'terminated').length,
  };

  const actions = PLAN_LIMITS[plan].actions as readonly string[];
  const features = [
    { label: 'Warn users', ok: actions.includes('warn') },
    { label: 'Promote / Demote', ok: actions.includes('promote') },
    { label: 'Terminate users', ok: actions.includes('terminate') },
    { label: 'Discord logging', ok: true },
    { label: 'Unlimited logs', ok: (PLAN_LIMITS[plan].maxLogsPerMonth as number) === -1 },
    { label: 'Multi-group support', ok: PLAN_LIMITS[plan].maxGroups > 1 },
  ];

  return (
    <div>
      <StatGrid>
        <StatCard label="Total Members" value={stats.total} color={theme.blue} icon={<Icon name="users" size={18} color={theme.blue} />} />
        <StatCard label="Active" value={stats.active} color={theme.green} icon={<Icon name="check" size={18} color={theme.green} strokeWidth={2.4} />} />
        <StatCard label="Warned" value={stats.warned} color={theme.amber} icon={<Icon name="warning" size={18} color={theme.amber} />} />
        <StatCard label="Communities" value={2} color={theme.accent} icon={<Icon name="box" size={18} color={theme.accent} />} />
      </StatGrid>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 14, letterSpacing: '-0.2px' }}>
            Recent Actions
          </div>
          {MOCK_LOGS.slice(0, 6).map((l) => (
            <div
              key={l.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 0',
                borderBottom: `1px solid rgba(255,255,255,0.03)`,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{l.target}</span>
                <span style={{ fontSize: 12, color: theme.textDim, marginLeft: 6 }}>{l.detail}</span>
              </div>
              <span style={{ fontSize: 11, color: theme.textDimmer }}>{l.time}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 14, letterSpacing: '-0.2px' }}>
            Plan Features — {PLAN_LIMITS[plan].name}
          </div>
          {features.map((f) => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: f.ok ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${f.ok ? 'rgba(34,197,94,0.25)' : theme.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name={f.ok ? 'check' : 'x'} size={10} color={f.ok ? theme.green : theme.textDimmer} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: 13, color: f.ok ? theme.text : theme.textDimmer }}>{f.label}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
