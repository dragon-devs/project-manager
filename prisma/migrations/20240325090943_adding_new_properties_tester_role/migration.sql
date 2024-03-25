-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'TESTER';

-- AlterTable
ALTER TABLE "Comment"
    ADD COLUMN "cmtNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Reply"
    ADD COLUMN "replyNumber" SERIAL NOT NULL;
