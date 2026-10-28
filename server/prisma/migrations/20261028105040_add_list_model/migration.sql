/*
  Warnings:

  - You are about to alter the column `name` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_listId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "listId" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
