import { useState } from 'react';
import { Badge, PageIntro, SearchInput, Table, Td, Tr, useToast } from '../../components/ui';
import { ADMIN_USERS, PLAN_COLORS, type AdminUser } from '../../lib/mock';
import { avatarColor, theme } from '../../theme';

export function AdminUsersView() {
  const toast = useToast();
  const [users, setUsers] = useState(ADMIN_USERS);
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (u) => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleSuspend(u: AdminUser) {
    setUsers((p) => p.map((x) => (x.id === u.id ? { ...x, status: x.status === 'active' ? 'suspended' : 'active' } : x)));
    toast(u.status === 'active' ? `${u.username} suspended` : `${u.username} reactivated`, u.status === 'active' ? 'error' : 'success');
  }

  return (
    <div>
      <PageIntro subtitle={`${users.length} accounts across the platform`} />
      <div style={{ marginBottom: 16 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by username or email…" />
      </div>

      <Table headers={['User', 'Email', 'Plan', 'Communities', 'Status', 'Joined', '']}>
        {filtered.map((u) => (
          <Tr key={u.id}>
            <Td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: avatarColor(u.username),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  {u.username.substring(0, 2).toUpperCase()}
                </div>
                <span style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{u.username}</span>
              </div>
            </Td>
            <Td style={{ color: theme.textFaint }}>{u.email}</Td>
            <Td>
              <Badge color={PLAN_COLORS[u.plan]}>{u.plan}</Badge>
            </Td>
            <Td>{u.communities}</Td>
            <Td>
              <Badge color={u.status === 'active' ? theme.green : theme.red}>{u.status}</Badge>
            </Td>
            <Td style={{ color: theme.textFaint }}>{u.joined}</Td>
            <Td>
              <button
                onClick={() => toggleSuspend(u)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 7,
                  border: `1px solid ${u.status === 'active' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
                  background: 'transparent',
                  color: u.status === 'active' ? theme.red : theme.green,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {u.status === 'active' ? 'Suspend' : 'Reactivate'}
              </button>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
