/**
 * Manual script to trigger Roblox rank sync for a community.
 * Usage: tsx scripts/sync-roblox-roles.ts <communityId>
 */

const communityId = process.argv[2];
const apiUrl = process.env.API_URL ?? 'http://localhost:3000';

if (!communityId) {
  console.error('Usage: tsx scripts/sync-roblox-roles.ts <communityId>');
  process.exit(1);
}

async function main() {
  const res = await fetch(`${apiUrl}/roles/community/${communityId}/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ADMIN_TOKEN ?? ''}`,
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  console.log(await res.json());
}

main().catch(console.error);
