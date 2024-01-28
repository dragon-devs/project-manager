-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('REACTJS', 'NODEJS', 'ANGULAR', 'VUE', 'DOTNET', 'NEXTJS', 'PYTHON', 'TYPESCRIPT', 'JAVASCRIPT', 'CPLUSPLUS', 'CSHARP', 'RUST', 'JAVA', 'PHP', 'RUBY', 'GOLANG', 'SWIFT', 'KOTLIN', 'DART');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'STUCK', 'IN_PROGRESS', 'FINISHED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "frameworks" "Languages"[] DEFAULT ARRAY['PYTHON']::"Languages"[],
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "priority" "Priority" NOT NULL DEFAULT 'NORMAL',
    "owner" TEXT DEFAULT 'Selected User',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "timeline" TIMESTAMP(3)[],
    "budget" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");
