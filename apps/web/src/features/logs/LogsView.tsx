import { PageHeader } from '../../components/PageHeader';

export function LogsView() {
  return (
    <>
      <PageHeader title="Audit logs" subtitle="Track moderation actions and sync events." />
      <p style={{ color: '#64748b' }}>No audit logs yet.</p>
    </>
  );
}
