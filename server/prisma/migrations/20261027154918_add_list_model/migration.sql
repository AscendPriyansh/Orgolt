/*
  Warnings:

  - You are about to drop the column `providerAcccountId` on the `AuthAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `AuthAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerAccountId` to the `AuthAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AuthAccount_provider_providerAcccountId_key";

-- AlterTable
ALTER TABLE "AuthAccount" DROP COLUMN "providerAcccountId",
ADD COLUMN     "providerAccountId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "boardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "List_boardId_position_idx" ON "List"("boardId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_provider_providerAccountId_key" ON "AuthAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Board_organizationId_idx" ON "Board"("organizationId");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
