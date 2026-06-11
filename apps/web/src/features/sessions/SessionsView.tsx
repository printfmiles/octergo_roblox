import { PageHeader } from '../../components/PageHeader';

export function SessionsView() {
  return (
    <>
      <PageHeader title="Sessions" subtitle="Schedule and announce community sessions." />
      <p style={{ color: '#64748b' }}>No sessions scheduled.</p>
    </>
  );
}
