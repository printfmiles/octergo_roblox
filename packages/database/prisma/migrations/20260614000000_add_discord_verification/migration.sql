-- AlterTable
ALTER TABLE "User" ADD COLUMN "discordUsername" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_discordUserId_key" ON "User"("discordUserId");

-- CreateTable
CREATE TABLE "DiscordVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "discordUserId" TEXT,
    "discordUsername" TEXT,
    "guildId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordVerification_code_key" ON "DiscordVerification"("code");

-- CreateIndex
CREATE INDEX "DiscordVerification_userId_idx" ON "DiscordVerification"("userId");

-- CreateIndex
CREATE INDEX "DiscordVerification_code_idx" ON "DiscordVerification"("code");

-- AddForeignKey
ALTER TABLE "DiscordVerification" ADD CONSTRAINT "DiscordVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
