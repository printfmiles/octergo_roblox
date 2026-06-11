import { PageHeader } from '../../components/PageHeader';

export function RolesView() {
  return (
    <>
      <PageHeader
        title="Role mapping"
        subtitle="Map Roblox ranks to Discord roles for automatic sync."
      />
      <p style={{ color: '#64748b' }}>Configure rank-to-role mappings for each community.</p>
    </>
  );
}
