-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Frameworks" ADD VALUE 'HTML';
ALTER TYPE "Frameworks" ADD VALUE 'CSS';
ALTER TYPE "Frameworks" ADD VALUE 'SQL';
ALTER TYPE "Frameworks" ADD VALUE 'MONGODB';
ALTER TYPE "Frameworks" ADD VALUE 'POSTGRESQL';
ALTER TYPE "Frameworks" ADD VALUE 'MYSQL';
ALTER TYPE "Frameworks" ADD VALUE 'C';
ALTER TYPE "Frameworks" ADD VALUE 'R';
ALTER TYPE "Frameworks" ADD VALUE 'SWIFTUI';
ALTER TYPE "Frameworks" ADD VALUE 'BASH';
ALTER TYPE "Frameworks" ADD VALUE 'PERL';
ALTER TYPE "Frameworks" ADD VALUE 'JQUERY';
ALTER TYPE "Frameworks" ADD VALUE 'SELENIUM';
ALTER TYPE "Frameworks" ADD VALUE 'DOCKER';
ALTER TYPE "Frameworks" ADD VALUE 'KUBERNETES';
ALTER TYPE "Frameworks" ADD VALUE 'JENKINS';
ALTER TYPE "Frameworks" ADD VALUE 'GITLAB';
ALTER TYPE "Frameworks" ADD VALUE 'GITHUB';
ALTER TYPE "Frameworks" ADD VALUE 'ANSIBLE';
ALTER TYPE "Frameworks" ADD VALUE 'ELKSTACK';
ALTER TYPE "Frameworks" ADD VALUE 'PROMETHEUS';
ALTER TYPE "Frameworks" ADD VALUE 'GRAFANA';
ALTER TYPE "Frameworks" ADD VALUE 'SENTRY';
ALTER TYPE "Frameworks" ADD VALUE 'BUGSNAG';
ALTER TYPE "Frameworks" ADD VALUE 'AWS';
ALTER TYPE "Frameworks" ADD VALUE 'AZURE';
ALTER TYPE "Frameworks" ADD VALUE 'GOOGLECLOUD';

-- AlterEnum
ALTER TYPE "Priority" ADD VALUE 'CRITICAL';
