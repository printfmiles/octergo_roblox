-- CreateEnum
CREATE TYPE "CommunityVerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'PENDING_APPROVAL', 'REJECTED');

-- AlterEnum
ALTER TYPE "ModerationAction" ADD VALUE 'SYNC';

-- AlterTable
ALTER TABLE "Community" ADD COLUMN "description" TEXT,
ADD COLUMN "verificationStatus" "CommunityVerificationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "verificationCode" TEXT,
ADD COLUMN "verificationMethod" TEXT,
ADD COLUMN "verifiedAt" TIMESTAMP(3),
ADD COLUMN "memberCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "discordWebhookUrl" TEXT,
ADD COLUMN "discordLogChannelId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE "Member" ADD COLUMN "previousRankId" INTEGER,
ADD COLUMN "previousRankName" TEXT,
ADD COLUMN "robloxJoinedAt" TIMESTAMP(3),
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "RoleMapping" ADD COLUMN "enabled" BOOLEAN NOT NULL DEFAULT true;
