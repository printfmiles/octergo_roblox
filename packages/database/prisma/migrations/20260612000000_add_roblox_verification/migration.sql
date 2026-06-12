-- CreateTable
CREATE TABLE "RobloxVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "robloxUserId" TEXT NOT NULL,
    "robloxUsername" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RobloxVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RobloxVerification_userId_idx" ON "RobloxVerification"("userId");

-- CreateIndex
CREATE INDEX "RobloxVerification_code_idx" ON "RobloxVerification"("code");

-- AddForeignKey
ALTER TABLE "RobloxVerification" ADD CONSTRAINT "RobloxVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
