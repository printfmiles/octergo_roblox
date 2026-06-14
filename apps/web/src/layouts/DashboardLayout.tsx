import { useNavigate } from 'react-router-dom';
import { SidebarLayout } from './SidebarLayout';
import type { NavGroup } from './SidebarLayout';
import { Icon } from '../components/ui';
import { useAuth, userSubtitle } from '../lib/auth-context';
import { useCommunity } from '../lib/community-context';
import { initials, theme } from '../theme';

const groups: NavGroup[] = [
  {
    title: 'OVERVIEW',
    items: [
      { to: '/dashboard', label: 'Overview', icon: 'home', end: true },
      { to: '/dashboard/activity', label: 'Activity', icon: 'activity' },
    ],
  },
  {
    title: 'SETUP',
    items: [
      { to: '/dashboard/roblox-setup', label: 'Roblox Setup', icon: 'roblox' },
      { to: '/dashboard/discord-setup', label: 'Discord Bot', icon: 'discord' },
      { to: '/dashboard/communities', label: 'Communities', icon: 'box' },
    ],
  },
  {
    title: 'MANAGE',
    items: [
      { to: '/dashboard/members', label: 'Members', icon: 'users' },
      { to: '/dashboard/role-mapping', label: 'Role Mapping', icon: 'link' },
      { to: '/dashboard/role-sync', label: 'Role Sync', icon: 'sync' },
      { to: '/dashboard/sessions', label: 'Sessions', icon: 'calendar' },
      { to: '/dashboard/moderation', label: 'Moderation', icon: 'shield' },
      { to: '/dashboard/audit-logs', label: 'Audit Logs', icon: 'file' },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { to: '/dashboard/billing', label: 'Billing', icon: 'card' },
      { to: '/dashboard/settings', label: 'Settings', icon: 'settings' },
    ],
  },
];

const allLabels = groups.flatMap((g) => g.items.map((i) => ({ to: i.to, label: i.label })));

export function DashboardLayout() {
  const navigate = useNavigate();
  const { user, loading: userLoading, signOut } = useAuth();
  const { communities, activeCommunity, activeCommunityId, setActiveCommunityId } = useCommunity();

  const displayName = user?.username ?? '…';
  const displaySubtitle = user ? userSubtitle(user, communities.length) : '';
  const avatarInitials = user ? initials(user.username) : '…';

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <SidebarLayout
      groups={groups}
      allLabels={allLabels}
      rightStatus={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {communities.length > 0 && (
            <select
              value={activeCommunityId ?? ''}
              onChange={(e) => setActiveCommunityId(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: 8,
                border: `1px solid ${theme.borderStrong}`,
                background: 'rgba(0,0,0,0.25)',
                color: theme.text,
                fontSize: 12,
                maxWidth: 180,
              }}
            >
              {communities.map((c) => (
                <option key={c.id} value={c.id} style={{ background: theme.bgElevated }}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              borderRadius: 20,
              background: activeCommunity?.verificationStatus === 'VERIFIED' ? 'rgba(34,197,94,0.08)' : 'rgba(251,191,36,0.08)',
              border: `1px solid ${activeCommunity?.verificationStatus === 'VERIFIED' ? 'rgba(34,197,94,0.15)' : 'rgba(251,191,36,0.2)'}`,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeCommunity?.verificationStatus === 'VERIFIED' ? theme.green : theme.amber }} />
            <span style={{ fontSize: 11, color: activeCommunity?.verificationStatus === 'VERIFIED' ? theme.green : theme.amber, fontWeight: 600 }}>
              {activeCommunity?.verificationStatus === 'VERIFIED' ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      }
      footer={
        <>
          <div
            style={{
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              borderRadius: 10,
              padding: '0.75rem',
              marginBottom: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: theme.textDim, letterSpacing: '0.08em' }}>PLAN</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: theme.accent,
                  background: theme.accentSoft,
                  padding: '1px 8px',
                  borderRadius: 10,
                }}
              >
                Pro
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              $12.99<span style={{ fontSize: 11, color: theme.textDim, fontWeight: 400 }}>/mo</span>
            </div>
            <button
              onClick={() => navigate('/dashboard/billing')}
              style={{
                width: '100%',
                fontSize: 11,
                padding: '6px',
                borderRadius: 7,
                border: `1px solid ${theme.accentBorder}`,
                background: theme.accentSoft,
                color: theme.accent,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Manage Plan
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.5rem 0.25rem', marginBottom: 6 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: theme.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {avatarInitials}
            </div>
            <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.text,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userLoading ? 'Loading…' : displayName}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: theme.textDim,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userLoading ? '' : displaySubtitle}
              </div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              fontSize: 12,
              padding: '7px',
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: 'transparent',
              color: theme.textDim,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Icon name="logout" size={13} color={theme.textDim} strokeWidth={2} />
            Sign Out
          </button>
        </>
      }
    />
  );
}
