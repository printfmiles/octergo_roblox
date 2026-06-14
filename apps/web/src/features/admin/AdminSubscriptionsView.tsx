import { Badge, Icon, PageIntro, StatCard, StatGrid, Table, Td, Tr } from '../../components/ui';
import { ADMIN_SUBSCRIPTIONS, PLAN_COLORS, type AdminSubscription } from '../../lib/mock';
import { theme } from '../../theme';

const STATUS_COLOR: Record<AdminSubscription['status'], string> = {
  active: theme.green,
  trialing: theme.blue,
  past_due: theme.amber,
  cancelled: theme.red,
};

export function AdminSubscriptionsView() {
  const mrr = ADMIN_SUBSCRIPTIONS.reduce((s, x) => s + (x.status === 'active' ? x.mrr : 0), 0);
  const pastDue = ADMIN_SUBSCRIPTIONS.filter((s) => s.status === 'past_due').length;
  const trialing = ADMIN_SUBSCRIPTIONS.filter((s) => s.status === 'trialing').length;

  return (
    <div>
      <PageIntro subtitle="Billing status across all customers" />

      <StatGrid columns={3}>
        <StatCard label="Active MRR" value={`$${(mrr * 36).toFixed(0)}`} color={theme.green} icon={<Icon name="card" size={18} color={theme.green} />} />
        <StatCard label="Trialing" value={trialing} color={theme.blue} icon={<Icon name="users" size={18} color={theme.blue} />} />
        <StatCard label="Past due" value={pastDue} color={theme.amber} icon={<Icon name="warning" size={18} color={theme.amber} />} />
      </StatGrid>

      <Table headers={['Customer', 'Plan', 'MRR', 'Status', 'Renews']}>
        {ADMIN_SUBSCRIPTIONS.map((s) => (
          <Tr key={s.id}>
            <Td style={{ color: theme.text, fontWeight: 500 }}>{s.user}</Td>
            <Td>
              <Badge color={PLAN_COLORS[s.plan]}>{s.plan}</Badge>
            </Td>
            <Td>${s.mrr.toFixed(2)}</Td>
            <Td>
              <Badge color={STATUS_COLOR[s.status]}>{s.status.replace('_', ' ')}</Badge>
            </Td>
            <Td style={{ color: theme.textFaint }}>{s.renews}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
