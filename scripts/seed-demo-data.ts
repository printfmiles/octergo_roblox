/**
 * Seeds demo data via Prisma.
 * Prefer: pnpm db:seed
 */
import { execSync } from 'node:child_process';

execSync('pnpm --filter database prisma db seed', { stdio: 'inherit' });
