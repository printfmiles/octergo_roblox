import { useState } from 'react';
import { Badge, PageIntro, SearchInput, Table, Td, Tr } from '../../components/ui';
import { MOCK_COMMUNITIES, PLAN_COLORS } from '../../lib/mock';
import { theme } from '../../theme';

export function AdminCommunitiesView() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_COMMUNITIES.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageIntro subtitle="Every Roblox community linked to Octergo" />
      <div style={{ marginBottom: 16 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search communities…" />
      </div>

      <Table headers={['Community', 'Group ID', 'Members', 'Plan', 'Status']}>
        {filtered.map((c) => (
          <Tr key={c.id}>
            <Td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: `${c.color}22`,
                    border: `1px solid ${c.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                    color: c.color,
                  }}
                >
                  {c.avatar}
                </div>
                <span style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{c.name}</span>
              </div>
            </Td>
            <Td style={{ color: theme.textFaint, fontFamily: 'monospace', fontSize: 12 }}>{c.groupId}</Td>
            <Td>{c.members.toLocaleString()}</Td>
            <Td>
              <Badge color={PLAN_COLORS[c.plan]}>{c.plan}</Badge>
            </Td>
            <Td>
              <Badge color={theme.green} dot>
                Active
              </Badge>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
