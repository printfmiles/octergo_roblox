import { useState } from 'react';
import { Card, Icon, PageIntro, StatCard, StatGrid, useToast } from '../../components/ui';
import { useStore } from '../../lib/store';
import { theme } from '../../theme';

export function RoleSyncView() {
  const toast = useToast();
  const { roleMaps, members, addSyncLog } = useStore();
  const [auto, setAuto] = useState(true);
  const [interval, setIntervalVal] = useState('15');
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('5 hrs ago');

  const enabledMaps = roleMaps.filter((r) => r.enabled).length;

  function syncNow() {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync('just now');
      addSyncLog('All members', `${members.length} members synced across ${enabledMaps} role mappings`);
      toast('Role sync complete!');
    }, 1200);
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <PageIntro title="Role Sync" subtitle="Keep Discord roles in sync with Roblox ranks" />

      <StatGrid columns={3}>
        <StatCard label="Active mappings" value={enabledMaps} color={theme.accent} icon={<Icon name="link" size={18} color={theme.accent} />} />
        <StatCard label="Members tracked" value={members.length} color={theme.blue} icon={<Icon name="users" size={18} color={theme.blue} />} />
        <StatCard label="Last sync" value={lastSync} color={theme.green} sub="Auto every 15 min" icon={<Icon name="sync" size={18} color={theme.green} />} />
      </StatGrid>

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Automatic sync</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>
              Octergo periodically applies rank changes from Roblox to Discord
            </div>
          </div>
          <button
            onClick={() => setAuto((a) => !a)}
            style={{
              width: 46,
              height: 26,
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              background: auto ? theme.gradient : 'rgba(255,255,255,0.1)',
              position: 'relative',
              transition: 'background .15s',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: auto ? 23 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .15s',
              }}
            />
          </button>
        </div>

        {auto && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: theme.textMuted }}>Sync every</span>
            <select
              value={interval}
              onChange={(e) => setIntervalVal(e.target.value)}
              style={{
                padding: '7px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${theme.borderStrong}`,
                borderRadius: 8,
                color: '#fff',
                fontSize: 13,
                colorScheme: 'dark',
              }}
            >
              {['5', '15', '30', '60'].map((m) => (
                <option key={m} value={m} style={{ background: theme.bgElevated }}>
                  {m} minutes
                </option>
              ))}
            </select>
          </div>
        )}
      </Card>

      <Card padding="1.5rem">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Manual sync</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>Force an immediate sync of all members</div>
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
    </div>
  );
}
