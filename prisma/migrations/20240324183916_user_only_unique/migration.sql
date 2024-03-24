/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_commentId_fkey";

-- DropIndex
DROP INDEX "Like_commentId_userId_key";

-- AlterTable
ALTER TABLE "Like"
    ALTER COLUMN "commentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_key" ON "Like" ("userId");

-- AddForeignKey
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
