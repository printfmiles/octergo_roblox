import { Outlet } from 'react-router-dom';
import { CommunityProvider } from '../lib/community-context';
import { DashboardDataProvider } from '../lib/store';

/** Dashboard data providers (auth is at app root). */
export function DashboardProviders() {
  return (
    <CommunityProvider>
      <DashboardDataProvider>
        <Outlet />
      </DashboardDataProvider>
    </CommunityProvider>
  );
}
