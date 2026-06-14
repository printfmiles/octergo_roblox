import { useState } from 'react';
import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';
import { Badge, PageIntro, SearchInput, Table, Td, Tr, useToast } from '../../components/ui';
import { useStore, type DashboardMember } from '../../lib/store';
import { avatarColor, theme } from '../../theme';
import { ModerationModal, type ModAction } from '../moderation/ModerationModal';

const STATUS_COLOR: Record<DashboardMember['status'], string> = {
  active: theme.green,
  warned: theme.amber,
  terminated: theme.red,
};

const plan = SubscriptionPlan.PRO;
const allowed = PLAN_LIMITS[plan].actions as readonly string[];

const ACTION_BTNS: { a: ModAction; label: string }[] = [
  { a: 'promote', label: '▲' },
  { a: 'demote', label: '▼' },
  { a: 'warn', label: '⚠' },
  { a: 'terminate', label: '✕' },
];

const ACTION_COLORS: Record<ModAction, string> = {
  promote: theme.green,
  demote: theme.orange,
  warn: theme.amber,
  terminate: theme.red,
};

export function MembersView() {
  const toast = useToast();
  const { members, applyAction, membersLoading } = useStore();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ action: ModAction; member: DashboardMember } | null>(null);

  const filtered = members.filter((m) => m.username.toLowerCase().includes(search.toLowerCase()));

  function startAction(action: ModAction, member: DashboardMember) {
    if (!allowed.includes(action)) {
      toast(`Upgrade your plan to use ${action}`, 'error');
      return;
    }
    setModal({ action, member });
  }

  return (
    <div>
      <PageIntro subtitle={membersLoading ? 'Loading members…' : `${members.length} members synced from your Roblox group`} />

      <div style={{ marginBottom: 16 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search members…" />
      </div>

      <Table headers={['Member', 'Rank', 'Status', 'Warnings', 'Joined', 'Actions']}>
        {filtered.map((m) => (
          <Tr key={m.id}>
            <Td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: avatarColor(m.username),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  {m.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{m.username}</div>
                  {m.discord && <div style={{ fontSize: 11, color: theme.textDim }}>@{m.discord}</div>}
                </div>
              </div>
            </Td>
            <Td>{m.rank}</Td>
            <Td>
              <Badge color={STATUS_COLOR[m.status]}>{m.status}</Badge>
            </Td>
            <Td style={{ color: m.warnings > 0 ? theme.amber : theme.textFaint }}>{m.warnings}</Td>
            <Td style={{ color: theme.textFaint }}>{m.joined}</Td>
            <Td>
              <div style={{ display: 'flex', gap: 5 }}>
                {ACTION_BTNS.map((btn) => {
                  const ok = allowed.includes(btn.a) && m.status !== 'terminated';
                  return (
                    <button
                      key={btn.a}
                      onClick={() => startAction(btn.a, m)}
                      title={btn.a}
                      disabled={m.status === 'terminated'}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        border: `1px solid ${ok ? ACTION_COLORS[btn.a] + '44' : theme.border}`,
                        background: ok ? ACTION_COLORS[btn.a] + '11' : 'transparent',
                        color: ok ? ACTION_COLORS[btn.a] : theme.textDim,
                        cursor: ok ? 'pointer' : 'not-allowed',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {btn.label}
                    </button>
                  );
                })}
              </div>
            </Td>
          </Tr>
        ))}
      </Table>

      {modal && (
        <ModerationModal
          action={modal.action}
          member={modal.member}
          onClose={() => setModal(null)}
          onConfirm={(rank, reason) => {
            applyAction(modal.action, modal.member, rank, reason);
            toast(`${modal.action} applied to ${modal.member.username}`);
            setModal(null);
          }}
        />
      )}
    </div>
  );
}
