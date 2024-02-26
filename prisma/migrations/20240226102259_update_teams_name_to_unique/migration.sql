/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Teams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Teams_name_key" ON "Teams"("name");
