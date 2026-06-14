import { useEffect, useState } from 'react';
import { API_ROUTES } from '@octergo/shared';
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
import { useCommunity } from '../../lib/community-context';
import { api, ApiError } from '../../lib/api';
import { useStore } from '../../lib/store';
import { theme } from '../../theme';

interface RobloxRankOption {
  id: number;
  name: string;
  rank: number;
}

export function RoleMappingView() {
  const toast = useToast();
  const { activeCommunity, activeCommunityId } = useCommunity();
  const { roleMaps, refreshRoleMaps } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [rankOptions, setRankOptions] = useState<RobloxRankOption[]>([]);
  const [selectedRankId, setSelectedRankId] = useState<number | ''>('');
  const [roleId, setRoleId] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!activeCommunity?.robloxGroupId) return;
    fetch(`https://groups.roblox.com/v1/groups/${activeCommunity.robloxGroupId}/roles`)
      .then((r) => r.json())
      .then((data: { roles: RobloxRankOption[] }) => {
        const roles = (data.roles ?? []).sort((a, b) => b.rank - a.rank);
        setRankOptions(roles);
        if (roles[0]) setSelectedRankId(roles[0].id);
      })
      .catch(() => setRankOptions([]));
  }, [activeCommunity?.robloxGroupId]);

  async function toggle(robloxRankId: number, enabled: boolean) {
    if (!activeCommunityId) return;
    try {
      await api.patch(`${API_ROUTES.ROLES}/community/${activeCommunityId}/mapping/${robloxRankId}`, { enabled });
      await refreshRoleMaps();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Update failed', 'error');
    }
  }

  async function addMapping() {
    if (!activeCommunityId || selectedRankId === '') {
      toast('Select a community and rank', 'error');
      return;
    }
    if (!roleId.trim()) {
      toast('Discord role ID is required', 'error');
      return;
    }
    const rank = rankOptions.find((r) => r.id === selectedRankId);
    if (!rank) return;

    setSaving(true);
    try {
      await api.post(`${API_ROUTES.ROLES}/community/${activeCommunityId}/mapping`, {
        robloxRankId: rank.id,
        robloxRankName: rank.name,
        discordRoleId: roleId.trim(),
        enabled: true,
      });
      await refreshRoleMaps();
      setShowModal(false);
      setRoleId('');
      toast('Role mapping saved!');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageIntro
        title="Role Mapping"
        subtitle="Map Roblox group ranks to Discord roles"
        action={
          <Button onClick={() => setShowModal(true)} disabled={!activeCommunityId}>
            <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
            Add Mapping
          </Button>
        }
      />

      {!activeCommunityId && (
        <p style={{ fontSize: 13, color: theme.amber, marginBottom: 16 }}>Add and verify a community first.</p>
      )}

      <Table headers={['Roblox Rank', '', 'Discord Role ID', 'Status', '']}>
        {roleMaps.map((r) => (
          <Tr key={r.id}>
            <Td style={{ color: theme.text, fontWeight: 500 }}>{r.robloxRankName}</Td>
            <Td>
              <Icon name="link" size={14} color={theme.accent} />
            </Td>
            <Td style={{ color: theme.textDim, fontFamily: 'monospace', fontSize: 12 }}>{r.discordRoleId}</Td>
            <Td>
              <span style={{ fontSize: 12, color: r.enabled ? theme.green : theme.textDim }}>
                {r.enabled ? 'Active' : 'Disabled'}
              </span>
            </Td>
            <Td>
              <button
                onClick={() => toggle(r.robloxRankId, !r.enabled)}
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

      {roleMaps.length === 0 && (
        <p style={{ fontSize: 13, color: theme.textFaint, marginTop: 12 }}>No mappings yet. Add one to enable role sync.</p>
      )}

      {showModal && (
        <Modal title="Add Role Mapping" subtitle="Connect a Roblox rank to a Discord role" onClose={() => setShowModal(false)}>
          <ModalField label="Roblox Rank" required>
            <select
              value={selectedRankId}
              onChange={(e) => setSelectedRankId(Number(e.target.value))}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            >
              {rankOptions.map((r) => (
                <option key={r.id} value={r.id} style={{ background: theme.bgElevated }}>
                  {r.name} (rank {r.rank})
                </option>
              ))}
            </select>
          </ModalField>
          <ModalField label="Discord Role ID" required hint="Right-click role in Discord → Copy Role ID (Developer Mode)">
            <input value={roleId} onChange={(e) => setRoleId(e.target.value)} placeholder="1102…006" style={inputStyle} />
          </ModalField>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" full onClick={() => setShowModal(false)}>Cancel</Button>
            <Button full onClick={addMapping} disabled={saving}>{saving ? 'Saving…' : 'Add Mapping'}</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
