import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { PageHeader } from '../components/PageHeader';
import { CommunitiesView } from '../features/communities/CommunitiesView';
import { MembersView } from '../features/members/MembersView';
import { SessionsView } from '../features/sessions/SessionsView';
import { RolesView } from '../features/roles/RolesView';
import { LogsView } from '../features/logs/LogsView';

function OverviewView() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your communities and recent activity." />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {['Communities', 'Members', 'Sessions', 'Logs'].map((label) => (
          <div
            key={label}
            style={{
              padding: '1.25rem',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>{label}</p>
            <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 700 }}>—</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function DashboardPage() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<OverviewView />} />
        <Route path="communities" element={<CommunitiesView />} />
        <Route path="members" element={<MembersView />} />
        <Route path="sessions" element={<SessionsView />} />
        <Route path="roles" element={<RolesView />} />
        <Route path="logs" element={<LogsView />} />
      </Route>
    </Routes>
  );
}
