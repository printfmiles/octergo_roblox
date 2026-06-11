import { NavLink, Outlet } from 'react-router-dom';
import { Wordmark } from '../components/Wordmark';

const navItems = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/communities', label: 'Communities' },
  { to: '/dashboard/members', label: 'Members' },
  { to: '/dashboard/sessions', label: 'Sessions' },
  { to: '/dashboard/roles', label: 'Roles' },
  { to: '/dashboard/logs', label: 'Logs' },
];

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Wordmark />
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
      <style>{`
        .dashboard-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 100vh;
        }
        .dashboard-sidebar {
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.5rem;
        }
        .dashboard-sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        .nav-link {
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 14px;
        }
        .nav-link:hover,
        .nav-link.active {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
        }
        .dashboard-main {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}
