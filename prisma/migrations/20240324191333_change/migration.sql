/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_commentId_userId_replyId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_userId_key" ON "Like" ("commentId", "userId");
