/*
  Warnings:

  - The values [OPEN,CLOSED,IN_PROGRESS] on the enum `CommentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CommentStatus_new" AS ENUM ('BUG', 'DOCUMENTATION', 'ENHANCEMENT', 'HELP_WANTED', 'QUESTION', 'REPLY');
ALTER TABLE "Comment"
    ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Comment" ALTER COLUMN "status" TYPE "CommentStatus_new" USING ("status"::text::"CommentStatus_new");
ALTER TYPE "CommentStatus" RENAME TO "CommentStatus_old";
ALTER TYPE "CommentStatus_new" RENAME TO "CommentStatus";
DROP TYPE "CommentStatus_old";
ALTER TABLE "Comment"
    ALTER COLUMN "status" SET DEFAULT 'QUESTION';
COMMIT;

-- AlterTable
ALTER TABLE "Comment"
    ALTER COLUMN "status" SET DEFAULT 'QUESTION';
