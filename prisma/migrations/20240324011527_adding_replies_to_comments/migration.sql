-- AlterTable
ALTER TABLE "Like"
    ADD COLUMN "replyId" TEXT;

-- CreateTable
CREATE TABLE "Reply"
(
    "id"        TEXT            NOT NULL,
    "content"   TEXT            NOT NULL,
    "status"    "CommentStatus" NOT NULL DEFAULT 'REPLY',
    "createdAt" TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)    NOT NULL,
    "commentId" TEXT            NOT NULL,
    "userId"    TEXT            NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reply_id_key" ON "Reply" ("id");

-- AddForeignKey
ALTER TABLE "Reply"
    ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply"
    ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
