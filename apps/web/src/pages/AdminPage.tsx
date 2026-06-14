import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { StatsView } from '../features/admin/StatsView';
import { AdminUsersView } from '../features/admin/AdminUsersView';
import { AdminCommunitiesView } from '../features/admin/AdminCommunitiesView';
import { AdminSubscriptionsView } from '../features/admin/AdminSubscriptionsView';
import { AdminNotificationsView } from '../features/admin/AdminNotificationsView';
import { AdminSupportView } from '../features/admin/AdminSupportView';
import { AdminOperationsView } from '../features/admin/AdminOperationsView';
import { AdminLogsView } from '../features/admin/AdminLogsView';

export function AdminPage() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<StatsView />} />
        <Route path="users" element={<AdminUsersView />} />
        <Route path="communities" element={<AdminCommunitiesView />} />
        <Route path="subscriptions" element={<AdminSubscriptionsView />} />
        <Route path="notifications" element={<AdminNotificationsView />} />
        <Route path="support" element={<AdminSupportView />} />
        <Route path="operations" element={<AdminOperationsView />} />
        <Route path="logs" element={<AdminLogsView />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
