import { Navigate, Route, Routes } from 'react-router-dom';
import { GuestRoute, ProtectedRoute } from '../components/auth/ProtectedRoute';
import { MarketingLayout } from '../layouts/MarketingLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { HomePage } from '../pages/marketing/HomePage';
import { FeaturesPage } from '../pages/marketing/FeaturesPage';
import { PricingPage } from '../pages/marketing/PricingPage';
import { StatusPage } from '../pages/marketing/StatusPage';
import { SupportPage } from '../pages/marketing/SupportPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { VerifyRobloxPage } from '../pages/VerifyRobloxPage';
import { VerifyDiscordPage } from '../pages/VerifyDiscordPage';
import { SelectPlanPage } from '../pages/SelectPlanPage';
import { DashboardProviders } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
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

export function App() {
  return (
    <Routes>
      {/* Public marketing website */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Route>

      {/* Auth — redirect to dashboard if already signed in */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/verify/roblox" element={<VerifyRobloxPage />} />
      <Route path="/verify/discord" element={<VerifyDiscordPage />} />
      <Route path="/select-plan" element={<SelectPlanPage />} />

      {/* Customer dashboard — JWT validated via /auth/me before render */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardProviders />}>
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
        </Route>
      </Route>

      {/* Octergo internal admin dashboard */}
      <Route path="/admin/*" element={<AdminPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
