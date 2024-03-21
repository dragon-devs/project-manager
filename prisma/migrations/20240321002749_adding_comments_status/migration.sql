-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('OPEN', 'CLOSED', 'IN_PROGRESS');

-- AlterTable
ALTER TABLE "Comment"
    ADD COLUMN "status" "CommentStatus" NOT NULL DEFAULT 'OPEN';
