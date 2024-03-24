/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId,replyId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_commentId_userId_key";

-- DropIndex
DROP INDEX "Like_id_key";

-- AlterTable
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_userId_replyId_key" ON "Like" ("commentId", "userId", "replyId");
