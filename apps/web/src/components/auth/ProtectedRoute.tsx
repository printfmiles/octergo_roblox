import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { theme } from '../../theme';

function SessionLoading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.bgDeep,
        color: theme.textFaint,
        fontSize: 14,
      }}
    >
      Checking your session…
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SessionLoading />;
  }

  if (!user) {
    const returnTo = location.pathname + location.search;
    return <Navigate to="/login" replace state={{ from: returnTo }} />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const redirectTo = from?.startsWith('/') ? from : '/dashboard';

  if (loading) {
    return <SessionLoading />;
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
