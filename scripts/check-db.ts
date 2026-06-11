/**
 * Verify Supabase connectivity using the same env as Prisma/API.
 * Usage: pnpm db:check
 */
import path from 'node:path';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 as ok`;
    console.log('Database connection OK:', result[0]?.ok === 1 ? 'yes' : result);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Database connection FAILED');
  console.error(err instanceof Error ? err.message : err);
  console.error('\nTips:');
  console.error('- Use root .env only (not packages/database/.env)');
  console.error('- DATABASE_URL = pooler (6543 + ?pgbouncer=true for transaction mode)');
  console.error('- DIRECT_URL   = db.<ref>.supabase.co:5432 for migrations');
  process.exit(1);
});
