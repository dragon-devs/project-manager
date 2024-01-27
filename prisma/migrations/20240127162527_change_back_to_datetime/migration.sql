/*
  Warnings:

  - You are about to alter the column `dueDate` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "owner" TEXT DEFAULT 'Selected User',
    "dueDate" DATETIME NOT NULL,
    "timeline" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "budget" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("budget", "createdAt", "description", "dueDate", "framework", "id", "name", "owner", "priority", "status", "timeline", "updatedAt") SELECT "budget", "createdAt", "description", "dueDate", "framework", "id", "name", "owner", "priority", "status", "timeline", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
