import { useNavigate } from 'react-router-dom';
import { SidebarLayout } from './SidebarLayout';
import type { NavGroup } from './SidebarLayout';
import { Icon } from '../components/ui';
import { useAuth } from '../lib/auth-context';
import { theme } from '../theme';

const groups: NavGroup[] = [
  {
    title: 'PLATFORM',
    items: [
      { to: '/admin', label: 'Platform Stats', icon: 'grid', end: true },
      { to: '/admin/operations', label: 'Operations', icon: 'server' },
      { to: '/admin/logs', label: 'Logs & Errors', icon: 'file' },
    ],
  },
  {
    title: 'CUSTOMERS',
    items: [
      { to: '/admin/users', label: 'Users', icon: 'users' },
      { to: '/admin/communities', label: 'Communities', icon: 'box' },
      { to: '/admin/subscriptions', label: 'Subscriptions', icon: 'card' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { to: '/admin/notifications', label: 'Notifications', icon: 'bell' },
      { to: '/admin/support', label: 'Support Tickets', icon: 'lifebuoy' },
    ],
  },
];

const allLabels = groups.flatMap((g) => g.items.map((i) => ({ to: i.to, label: i.label })));

export function AdminLayout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <SidebarLayout
      groups={groups}
      allLabels={allLabels}
      brandSuffix="ADMIN"
      rightStatus={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 20,
            background: 'rgba(167,139,250,0.08)',
            border: `1px solid ${theme.accentBorder}`,
          }}
        >
          <Icon name="shield" size={12} color={theme.accent} />
          <span style={{ fontSize: 11, color: theme.accent, fontWeight: 600 }}>Internal — Octergo Team</span>
        </div>
      }
      footer={
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
      }
    />
  );
}
