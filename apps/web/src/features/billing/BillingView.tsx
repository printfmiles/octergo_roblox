import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';
import { Card, Icon, PageIntro, Table, Td, Tr, useToast } from '../../components/ui';
import { theme } from '../../theme';

const currentPlan = SubscriptionPlan.PRO;

const invoices = [
  { id: 'INV-2026-06', date: 'Jun 1, 2026', amount: '$12.99', status: 'Paid' },
  { id: 'INV-2026-05', date: 'May 1, 2026', amount: '$12.99', status: 'Paid' },
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: '$12.99', status: 'Paid' },
];

const order = [SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE];

export function BillingView() {
  const toast = useToast();
  const config = PLAN_LIMITS[currentPlan];

  return (
    <div style={{ maxWidth: 880 }}>
      <PageIntro title="Billing" subtitle="Manage your subscription and payment method" />

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 12, color: theme.textFaint, marginBottom: 4 }}>CURRENT PLAN</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{config.name}</span>
              <span style={{ fontSize: 14, color: theme.textMuted }}>${config.price}/mo</span>
            </div>
            <div style={{ fontSize: 12, color: theme.textFaint, marginTop: 4 }}>Renews Jul 1, 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => toast('Subscription cancelled (demo)', 'error')}
              style={{ padding: '9px 18px', borderRadius: 10, border: `1px solid ${theme.borderStrong}`, background: 'transparent', color: theme.textMuted, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Card>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.06em', margin: '8px 0 14px' }}>
        CHANGE PLAN
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginBottom: 28 }}>
        {order.map((p) => {
          const c = PLAN_LIMITS[p];
          const isCurrent = p === currentPlan;
          return (
            <div
              key={p}
              style={{
                background: isCurrent ? theme.accentSoft : theme.bgCard,
                border: `1px solid ${isCurrent ? theme.accentBorder : theme.border}`,
                borderRadius: 14,
                padding: '1.25rem',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? theme.accent : theme.textFaint, letterSpacing: '0.08em', marginBottom: 6 }}>
                {c.name.toUpperCase()}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                ${c.price}
                <span style={{ fontSize: 13, fontWeight: 400, color: theme.textDim }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 14 }}>
                {c.maxGroups} group{c.maxGroups > 1 ? 's' : ''} ·{' '}
                {c.maxLogsPerMonth === -1 ? 'Unlimited' : c.maxLogsPerMonth} logs/mo
              </div>
              <button
                disabled={isCurrent}
                onClick={() => toast(`Switched to ${c.name}!`)}
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: 9,
                  border: isCurrent ? `1px solid ${theme.border}` : 'none',
                  background: isCurrent ? 'transparent' : theme.gradient,
                  color: isCurrent ? theme.textFaint : '#fff',
                  cursor: isCurrent ? 'default' : 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {isCurrent ? 'Current plan' : `Switch to ${c.name}`}
              </button>
            </div>
          );
        })}
      </div>

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="card" size={20} color={theme.accent} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>Visa ending in 4242</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>Expires 09/28</div>
          </div>
          <button
            onClick={() => toast('Payment method updated')}
            style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${theme.borderStrong}`, background: 'transparent', color: theme.textMuted, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
          >
            Update
          </button>
        </div>
      </Card>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.06em', margin: '8px 0 14px' }}>
        INVOICES
      </div>
      <Table headers={['Invoice', 'Date', 'Amount', 'Status', '']}>
        {invoices.map((inv) => (
          <Tr key={inv.id}>
            <Td style={{ color: theme.text, fontWeight: 500 }}>{inv.id}</Td>
            <Td style={{ color: theme.textFaint }}>{inv.date}</Td>
            <Td style={{ color: theme.text }}>{inv.amount}</Td>
            <Td>
              <span style={{ fontSize: 12, color: theme.green }}>{inv.status}</span>
            </Td>
            <Td>
              <button
                onClick={() => toast(`Downloading ${inv.id}.pdf`)}
                style={{ background: 'none', border: 'none', color: theme.accent, cursor: 'pointer', fontSize: 12 }}
              >
                Download
              </button>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
