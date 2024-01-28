-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Frameworks" ADD VALUE 'FLASK';
ALTER TYPE "Frameworks" ADD VALUE 'FASTAPI';
ALTER TYPE "Frameworks" ADD VALUE 'ASPDOTNET';
ALTER TYPE "Frameworks" ADD VALUE 'TYPESCRIPT';
ALTER TYPE "Frameworks" ADD VALUE 'JAVASCRIPT';
ALTER TYPE "Frameworks" ADD VALUE 'CPLUSPLUS';
ALTER TYPE "Frameworks" ADD VALUE 'CSHARP';
ALTER TYPE "Frameworks" ADD VALUE 'RUST';
ALTER TYPE "Frameworks" ADD VALUE 'JAVA';
ALTER TYPE "Frameworks" ADD VALUE 'PHP';
ALTER TYPE "Frameworks" ADD VALUE 'RUBY';
ALTER TYPE "Frameworks" ADD VALUE 'GOLANG';
ALTER TYPE "Frameworks" ADD VALUE 'SWIFT';
ALTER TYPE "Frameworks" ADD VALUE 'KOTLIN';
ALTER TYPE "Frameworks" ADD VALUE 'DART';
ALTER TYPE "Frameworks" ADD VALUE 'ANGULAR';
ALTER TYPE "Frameworks" ADD VALUE 'VUE';
ALTER TYPE "Frameworks" ADD VALUE 'DOTNET';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'PENDING';
ALTER TYPE "Status" ADD VALUE 'OVERDUE';
ALTER TYPE "Status" ADD VALUE 'REOPENED';
