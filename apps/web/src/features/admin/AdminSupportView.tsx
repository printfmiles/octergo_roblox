import { useState } from 'react';
import { Badge, PageIntro, Table, Td, Tr, useToast } from '../../components/ui';
import { ADMIN_TICKETS, type AdminTicket } from '../../lib/mock';
import { theme } from '../../theme';

const PRIORITY_COLOR: Record<AdminTicket['priority'], string> = {
  low: theme.textFaint,
  medium: theme.amber,
  high: theme.red,
};

const STATUS_COLOR: Record<AdminTicket['status'], string> = {
  open: theme.blue,
  pending: theme.amber,
  closed: theme.textFaint,
};

const FILTERS = ['all', 'open', 'pending', 'closed'] as const;

export function AdminSupportView() {
  const toast = useToast();
  const [tickets, setTickets] = useState(ADMIN_TICKETS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');

  const filtered = filter === 'all' ? tickets : tickets.filter((t) => t.status === filter);

  function close(t: AdminTicket) {
    setTickets((p) => p.map((x) => (x.id === t.id ? { ...x, status: 'closed' } : x)));
    toast(`Ticket #${t.id} closed`);
  }

  return (
    <div>
      <PageIntro subtitle={`${tickets.filter((t) => t.status !== 'closed').length} open tickets`} />

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

      <Table headers={['#', 'Subject', 'User', 'Priority', 'Status', 'Updated', '']}>
        {filtered.map((t) => (
          <Tr key={t.id}>
            <Td style={{ color: theme.textFaint, fontFamily: 'monospace' }}>{t.id}</Td>
            <Td style={{ color: theme.text, fontWeight: 500 }}>{t.subject}</Td>
            <Td style={{ color: theme.textFaint }}>{t.user}</Td>
            <Td>
              <Badge color={PRIORITY_COLOR[t.priority]}>{t.priority}</Badge>
            </Td>
            <Td>
              <Badge color={STATUS_COLOR[t.status]}>{t.status}</Badge>
            </Td>
            <Td style={{ color: theme.textDimmer }}>{t.updated}</Td>
            <Td>
              {t.status !== 'closed' ? (
                <button
                  onClick={() => close(t)}
                  style={{ padding: '4px 12px', borderRadius: 7, border: `1px solid ${theme.borderStrong}`, background: 'transparent', color: theme.textMuted, cursor: 'pointer', fontSize: 12 }}
                >
                  Close
                </button>
              ) : (
                <span style={{ fontSize: 12, color: theme.textDimmer }}>—</span>
              )}
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
