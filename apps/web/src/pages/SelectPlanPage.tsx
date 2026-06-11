import { Link } from 'react-router-dom';
import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';
import { Shell } from '../layouts/Shell';
import { PageHeader } from '../components/PageHeader';

const plans = [
  SubscriptionPlan.STARTER,
  SubscriptionPlan.PRO,
  SubscriptionPlan.ENTERPRISE,
];

export function SelectPlanPage() {
  return (
    <Shell>
      <div style={{ maxWidth: 960, margin: '4rem auto', padding: '0 1.5rem' }}>
        <PageHeader title="Choose your plan" subtitle="Upgrade anytime as your community grows." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {plans.map((plan) => {
            const config = PLAN_LIMITS[plan];
            return (
              <div
                key={plan}
                style={{
                  padding: '1.5rem',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <h2 style={{ margin: 0 }}>{config.name}</h2>
                <p style={{ fontSize: 28, fontWeight: 800, margin: '12px 0' }}>
                  ${config.price}
                  <span style={{ fontSize: 14, fontWeight: 400, color: '#64748b' }}>/mo</span>
                </p>
                <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20 }}>
                  <li>{config.maxGroups} group{config.maxGroups > 1 ? 's' : ''}</li>
                  <li>{config.maxLogsPerMonth === -1 ? 'Unlimited' : config.maxLogsPerMonth} logs/mo</li>
                  <li>{config.actions.join(', ')} actions</li>
                </ul>
                <Link
                  to="/dashboard"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: 16,
                    padding: '10px 20px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg,#c084fc,#818cf8)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  Select {config.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
