import { useState } from 'react';
import { API_ROUTES } from '@octergo/shared';
import type { RoleSyncResult } from '@octergo/shared';
import { Card, Icon, PageIntro, StatCard, StatGrid, useToast } from '../../components/ui';
import { useCommunity } from '../../lib/community-context';
import { api, ApiError } from '../../lib/api';
import { useStore } from '../../lib/store';
import { theme } from '../../theme';

export function RoleSyncView() {
  const toast = useToast();
  const { activeCommunity, activeCommunityId } = useCommunity();
  const { roleMaps, members, refreshMembers, refreshLogs, addSyncLog } = useStore();
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const enabledMaps = roleMaps.filter((r) => r.enabled).length;

  async function syncNow() {
    if (!activeCommunityId) {
      toast('Select or create a community first', 'error');
      return;
    }
    if (activeCommunity?.verificationStatus !== 'VERIFIED') {
      toast('Verify your community before syncing roles', 'error');
      return;
    }

    setSyncing(true);
    try {
      const result = await api.post<RoleSyncResult>(
        `${API_ROUTES.ROLES}/community/${activeCommunityId}/sync`,
        {},
      );
      setLastSync('just now');
      addSyncLog(
        'All members',
        `${result.usersProcessed} users synced · ${result.rolesApplied} roles applied · ${result.rolesRemoved} removed`,
      );
      await refreshMembers();
      await refreshLogs();
      const failNote = result.failed.length > 0 ? ` (${result.failed.length} failed)` : '';
      toast(`Role sync complete!${failNote}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Sync failed', 'error');
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <PageIntro subtitle="Keep Discord roles in sync with Roblox ranks" />

      {!activeCommunityId && (
        <p style={{ fontSize: 13, color: theme.amber, marginBottom: 16 }}>
          Add a community under Communities before syncing roles.
        </p>
      )}

      <StatGrid columns={3}>
        <StatCard label="Active mappings" value={enabledMaps} color={theme.accent} icon={<Icon name="link" size={18} color={theme.accent} />} />
        <StatCard label="Members tracked" value={members.length} color={theme.blue} icon={<Icon name="users" size={18} color={theme.blue} />} />
        <StatCard label="Last sync" value={lastSync ?? 'Never'} color={theme.green} sub="Manual sync" icon={<Icon name="sync" size={18} color={theme.green} />} />
      </StatGrid>

      <Card padding="1.5rem">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Manual sync</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>
              Syncs Roblox members, then applies Discord roles for verified users with mappings
            </div>
          </div>
          <button
            onClick={syncNow}
            disabled={syncing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 10,
              border: 'none',
              background: theme.gradient,
              color: '#fff',
              cursor: syncing ? 'wait' : 'pointer',
              fontSize: 13,
              fontWeight: 700,
              opacity: syncing ? 0.7 : 1,
            }}
          >
            <Icon name="sync" size={15} color="#fff" strokeWidth={2.2} />
            {syncing ? 'Syncing…' : 'Sync now'}
          </button>
        </div>
      </Card>

      <p style={{ marginTop: 14, fontSize: 12, color: theme.textFaint }}>
        Members can also run <code>/sync_roles community_id:{activeCommunityId ?? '…'}</code> in Discord.
      </p>
    </div>
  );
}
