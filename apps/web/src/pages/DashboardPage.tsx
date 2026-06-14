import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardDataProvider } from '../lib/store';
import { OverviewView } from '../features/overview/OverviewView';
import { ActivityView } from '../features/activity/ActivityView';
import { RobloxSetupView } from '../features/roblox/RobloxSetupView';
import { DiscordSetupView } from '../features/discord/DiscordSetupView';
import { CommunitiesView } from '../features/communities/CommunitiesView';
import { MembersView } from '../features/members/MembersView';
import { RoleMappingView } from '../features/roles/RoleMappingView';
import { RoleSyncView } from '../features/roles/RoleSyncView';
import { SessionsView } from '../features/sessions/SessionsView';
import { ModerationView } from '../features/moderation/ModerationView';
import { AuditLogsView } from '../features/logs/AuditLogsView';
import { BillingView } from '../features/billing/BillingView';
import { SettingsView } from '../features/settings/SettingsView';

export function DashboardPage() {
  return (
    <DashboardDataProvider>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<OverviewView />} />
          <Route path="activity" element={<ActivityView />} />
          <Route path="roblox-setup" element={<RobloxSetupView />} />
          <Route path="discord-setup" element={<DiscordSetupView />} />
          <Route path="communities" element={<CommunitiesView />} />
          <Route path="members" element={<MembersView />} />
          <Route path="role-mapping" element={<RoleMappingView />} />
          <Route path="role-sync" element={<RoleSyncView />} />
          <Route path="sessions" element={<SessionsView />} />
          <Route path="moderation" element={<ModerationView />} />
          <Route path="audit-logs" element={<AuditLogsView />} />
          <Route path="billing" element={<BillingView />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </DashboardDataProvider>
  );
}
