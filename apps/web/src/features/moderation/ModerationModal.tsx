import { useState } from 'react';
import { Modal, inputStyle } from '../../components/ui';
import { RANKS, type MockMember } from '../../lib/mock';
import { theme } from '../../theme';

export type ModAction = 'promote' | 'demote' | 'warn' | 'terminate';

export const ACTION_COLOR: Record<ModAction, string> = {
  promote: theme.green,
  demote: theme.orange,
  warn: theme.amber,
  terminate: theme.red,
};

interface ModerationModalProps {
  action: ModAction;
  member: MockMember;
  onClose: () => void;
  onConfirm: (newRank: string, reason: string) => void;
}

export function ModerationModal({ action, member, onClose, onConfirm }: ModerationModalProps) {
  const idx = RANKS.indexOf(member.rank);
  const defaultRank =
    action === 'promote'
      ? RANKS[Math.min(idx + 1, RANKS.length - 1)]
      : action === 'demote'
        ? RANKS[Math.max(idx - 1, 0)]
        : member.rank;

  const [rank, setRank] = useState(defaultRank);
  const [reason, setReason] = useState('');

  const title = action.charAt(0).toUpperCase() + action.slice(1);

  return (
    <Modal title={`${title} User`} subtitle={`Target: ${member.username}`} onClose={onClose} width={400}>
      {(action === 'promote' || action === 'demote') && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>New Rank</div>
          <select value={rank} onChange={(e) => setRank(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }}>
            {RANKS.map((r) => (
              <option key={r} value={r} style={{ background: theme.bgElevated }}>
                {r}
              </option>
            ))}
          </select>
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 6 }}>
          Reason <span style={{ color: theme.textDim }}>(optional)</span>
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason…"
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: '9px',
            borderRadius: 8,
            border: `1px solid ${theme.borderStrong}`,
            background: 'transparent',
            color: theme.textMuted,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(rank, reason)}
          style={{
            flex: 1,
            padding: '9px',
            borderRadius: 8,
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            background: ACTION_COLOR[action],
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
