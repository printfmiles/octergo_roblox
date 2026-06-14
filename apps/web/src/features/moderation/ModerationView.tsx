import { useState } from 'react';
import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';
import { Badge, Card, EmptyState, Icon, PageIntro, StatCard, StatGrid, useToast } from '../../components/ui';
import { useStore } from '../../lib/store';
import { avatarColor, theme } from '../../theme';
import { ModerationModal, type ModAction } from './ModerationModal';
import type { DashboardMember } from '../../lib/store';

const plan = SubscriptionPlan.PRO;
const allowed = PLAN_LIMITS[plan].actions as readonly string[];

export function ModerationView() {
  const toast = useToast();
  const { members, applyAction } = useStore();
  const [modal, setModal] = useState<{ action: ModAction; member: DashboardMember } | null>(null);

  const flagged = members.filter((m) => m.warnings > 0 || m.status !== 'active');
  const totalWarnings = members.reduce((sum, m) => sum + m.warnings, 0);

  function start(action: ModAction, member: DashboardMember) {
    if (!allowed.includes(action)) {
      toast(`Upgrade your plan to use ${action}`, 'error');
      return;
    }
    setModal({ action, member });
  }

  return (
    <div>
      <PageIntro title="Moderation" subtitle="Review flagged members and take action" />

      <StatGrid columns={3}>
        <StatCard label="Flagged members" value={flagged.length} color={theme.amber} icon={<Icon name="warning" size={18} color={theme.amber} />} />
        <StatCard label="Total warnings" value={totalWarnings} color={theme.orange} icon={<Icon name="shield" size={18} color={theme.orange} />} />
        <StatCard label="Terminated" value={members.filter((m) => m.status === 'terminated').length} color={theme.red} icon={<Icon name="x" size={18} color={theme.red} strokeWidth={2.4} />} />
      </StatGrid>

      {flagged.length === 0 ? (
        <EmptyState title="No flagged members" hint="Everyone is in good standing." dashed={false} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {flagged.map((m) => (
            <Card key={m.id} padding="1.1rem 1.25rem">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    background: avatarColor(m.username),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  {m.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>{m.username}</div>
                  <div style={{ fontSize: 12, color: theme.textFaint }}>
                    {m.rank} · {m.warnings} warning{m.warnings === 1 ? '' : 's'}
                  </div>
                </div>
                <Badge color={m.status === 'terminated' ? theme.red : theme.amber}>{m.status}</Badge>
                {m.status !== 'terminated' && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <ActionBtn label="Warn" color={theme.amber} disabled={!allowed.includes('warn')} onClick={() => start('warn', m)} />
                    <ActionBtn label="Demote" color={theme.orange} disabled={!allowed.includes('demote')} onClick={() => start('demote', m)} />
                    <ActionBtn label="Terminate" color={theme.red} disabled={!allowed.includes('terminate')} onClick={() => start('terminate', m)} />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

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

function ActionBtn({ label, color, disabled, onClick }: { label: string; color: string; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 12px',
        borderRadius: 8,
        border: `1px solid ${disabled ? theme.border : color + '44'}`,
        background: disabled ? 'transparent' : color + '11',
        color: disabled ? theme.textDim : color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}
