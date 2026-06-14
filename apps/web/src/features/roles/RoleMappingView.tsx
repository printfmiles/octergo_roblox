import { useState } from 'react';
import {
  Button,
  Icon,
  Modal,
  ModalField,
  PageIntro,
  Table,
  Td,
  Tr,
  inputStyle,
  useToast,
} from '../../components/ui';
import { useStore } from '../../lib/store';
import { RANKS } from '../../lib/mock';
import { theme } from '../../theme';

export function RoleMappingView() {
  const toast = useToast();
  const { roleMaps, setRoleMaps } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [rank, setRank] = useState(RANKS[1]);
  const [role, setRole] = useState('');
  const [roleId, setRoleId] = useState('');

  function toggle(id: number) {
    setRoleMaps((p) => p.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  }

  function addMapping() {
    if (!role.trim() || !roleId.trim()) {
      toast('Discord role and ID are required', 'error');
      return;
    }
    setRoleMaps((p) => [
      ...p,
      {
        id: Date.now(),
        robloxRank: rank,
        robloxRankId: 50,
        discordRole: role.startsWith('@') ? role : `@${role}`,
        discordRoleId: roleId,
        enabled: true,
      },
    ]);
    setShowModal(false);
    setRole('');
    setRoleId('');
    toast('Role mapping created!');
  }

  return (
    <div>
      <PageIntro
        title="Role Mapping"
        subtitle="Map Roblox group ranks to Discord roles"
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
            Add Mapping
          </Button>
        }
      />

      <Table headers={['Roblox Rank', '', 'Discord Role', 'Discord Role ID', 'Status', '']}>
        {roleMaps.map((r) => (
          <Tr key={r.id}>
            <Td style={{ color: theme.text, fontWeight: 500 }}>{r.robloxRank}</Td>
            <Td>
              <Icon name="link" size={14} color={theme.accent} />
            </Td>
            <Td style={{ color: theme.accent }}>{r.discordRole}</Td>
            <Td style={{ color: theme.textDim, fontFamily: 'monospace', fontSize: 12 }}>{r.discordRoleId}</Td>
            <Td>
              <span style={{ fontSize: 12, color: r.enabled ? theme.green : theme.textDim }}>
                {r.enabled ? 'Active' : 'Disabled'}
              </span>
            </Td>
            <Td>
              <button
                onClick={() => toggle(r.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 7,
                  border: `1px solid ${theme.borderStrong}`,
                  background: 'transparent',
                  color: theme.textMuted,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {r.enabled ? 'Disable' : 'Enable'}
              </button>
            </Td>
          </Tr>
        ))}
      </Table>

      {showModal && (
        <Modal title="Add Role Mapping" subtitle="Connect a Roblox rank to a Discord role" onClose={() => setShowModal(false)}>
          <ModalField label="Roblox Rank" required>
            <select value={rank} onChange={(e) => setRank(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }}>
              {RANKS.map((r) => (
                <option key={r} value={r} style={{ background: theme.bgElevated }}>
                  {r}
                </option>
              ))}
            </select>
          </ModalField>
          <ModalField label="Discord Role" required>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="@Member" style={inputStyle} />
          </ModalField>
          <ModalField label="Discord Role ID" required>
            <input value={roleId} onChange={(e) => setRoleId(e.target.value)} placeholder="1102…006" style={inputStyle} />
          </ModalField>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" full onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button full onClick={addMapping}>
              Add Mapping
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
