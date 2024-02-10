/*
  Warnings:

  - You are about to drop the column `teamsId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamsId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamsId";

-- CreateTable
CREATE TABLE "_TeamsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamsToUser_AB_unique" ON "_TeamsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamsToUser_B_index" ON "_TeamsToUser"("B");

-- AddForeignKey
ALTER TABLE "_TeamsToUser" ADD CONSTRAINT "_TeamsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamsToUser" ADD CONSTRAINT "_TeamsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
