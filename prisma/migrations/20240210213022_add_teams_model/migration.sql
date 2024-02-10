-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamsId" TEXT;

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industry" TEXT,
    "rating" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamsId_fkey" FOREIGN KEY ("teamsId") REFERENCES "Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
