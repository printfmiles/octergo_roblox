import path from 'node:path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../../../.env') });

import { PrismaClient, SubscriptionPlan } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@octergo.dev' },
    update: {},
    create: {
      email: 'demo@octergo.dev',
      username: 'demo',
      passwordHash: '$2b$10$placeholder_hash_replace_in_production',
      robloxVerified: true,
      discordVerified: true,
      subscription: {
        create: {
          plan: SubscriptionPlan.PRO,
        },
      },
    },
  });

  console.log(`Seeded demo user: ${demoUser.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
