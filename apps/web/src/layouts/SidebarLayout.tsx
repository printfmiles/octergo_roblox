import type { ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Wordmark } from '../components/Wordmark';
import { Icon } from '../components/ui';
import type { IconName } from '../components/ui';
import { theme } from '../theme';

export interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarLayoutProps {
  groups: NavGroup[];
  topBanner?: ReactNode;
  footer?: ReactNode;
  /** Title shown top-left of content header */
  brandSuffix?: string;
  rightStatus?: ReactNode;
  allLabels: { to: string; label: string }[];
}

export function SidebarLayout({ groups, topBanner, footer, brandSuffix, rightStatus, allLabels }: SidebarLayoutProps) {
  const location = useLocation();

  const current =
    [...allLabels]
      .sort((a, b) => b.to.length - a.to.length)
      .find((l) => location.pathname === l.to || location.pathname.startsWith(l.to + '/'))?.label ??
    'Overview';

  return (
    <div
      style={{
        height: '100vh',
        background: theme.bgDeep,
        color: theme.text,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <aside
        style={{
          width: 230,
          background: theme.bgPanel,
          borderRight: `1px solid rgba(255,255,255,0.05)`,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          height: '100vh',
        }}
      >
        <div
          style={{
            padding: '1.2rem 1rem 1rem',
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Wordmark size={24} />
          {brandSuffix && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: theme.accent,
                background: theme.accentSoft,
                border: `1px solid ${theme.accentBorder}`,
                padding: '2px 6px',
                borderRadius: 6,
              }}
            >
              {brandSuffix}
            </span>
          )}
        </div>

        {topBanner}

        <div style={{ padding: '0.5rem', flex: 1, overflowY: 'auto' }}>
          {groups.map((group) => (
            <div key={group.title} style={{ marginBottom: 6 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: theme.textDimmer,
                  letterSpacing: '0.1em',
                  padding: '0.75rem 0.75rem 0.4rem',
                }}
              >
                {group.title}
              </div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="sb-link"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '0.55rem 0.75rem',
                    borderRadius: 8,
                    background: isActive ? theme.accentSoft : 'transparent',
                    color: isActive ? theme.accent : theme.textFaint,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    marginBottom: 1,
                  })}
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <>
                      <Icon name={item.icon} color={isActive ? theme.accent : theme.textFaint} />
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {footer && (
          <div style={{ padding: '0.75rem', flexShrink: 0, borderTop: `1px solid rgba(255,255,255,0.05)` }}>
            {footer}
          </div>
        )}
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div
          style={{
            padding: '0.95rem 1.5rem',
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.bgDeep,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
            {current}
          </div>
          {rightStatus}
        </div>

        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
      <style>{`.sb-link:hover { background: rgba(255,255,255,0.04) !important; }`}</style>
    </div>
  );
}
