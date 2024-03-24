-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('BUG', 'DOCUMENTATION', 'ENHANCEMENT', 'HELP_WANTED', 'QUESTION', 'REPLY');

-- CreateEnum
CREATE TYPE "Frameworks" AS ENUM ('REACTJS', 'NODEJS', 'NEXTJS', 'PYTHON', 'DJANGO', 'FLASK', 'FASTAPI', 'ASPDOTNET', 'TYPESCRIPT', 'JAVASCRIPT', 'CPLUSPLUS', 'CSHARP', 'RUST', 'JAVA', 'PHP', 'RUBY', 'GOLANG', 'SWIFT', 'KOTLIN', 'DART', 'ANGULAR', 'VUEJS', 'DOTNET', 'HTML', 'CSS', 'SQL', 'MYSQL', 'POSTGRESQL', 'SQLITE', 'SQLALCHEMY', 'MONGODB', 'C', 'R', 'SWIFTUI', 'BASH', 'PERL', 'JQUERY', 'SELENIUM', 'DOCKER', 'KUBERNETES', 'JENKINS', 'GITLAB', 'GITHUB', 'ANSIBLE', 'PROMETHEUS', 'GRAFANA', 'AWS', 'AZURE', 'GOOGLECLOUD', 'EXPRESSJS', 'SPRINGBOOT', 'FLUTTER', 'LARAVEL', 'REACTNATIVE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'STUCK', 'COMPLETED', 'CANCELLED', 'PENDING', 'OVERDUE', 'REOPENED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'MEMBER', 'VIEWER');

-- CreateTable
CREATE TABLE "Project"
(
    "id"               TEXT         NOT NULL,
    "name"             TEXT         NOT NULL,
    "description"      TEXT         NOT NULL,
    "frameworks"       "Frameworks"[],
    "status"           "Status"     NOT NULL DEFAULT 'NOT_STARTED',
    "priority"         "Priority"   NOT NULL DEFAULT 'NORMAL',
    "dueDate"          TIMESTAMP(3) NOT NULL,
    "timeline"         TIMESTAMP(3)[],
    "budget"           TEXT,
    "assignedToUserId" TEXT,
    "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"        TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Account"
(
    "id"                TEXT NOT NULL,
    "userId"            TEXT NOT NULL,
    "type"              TEXT NOT NULL,
    "provider"          TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token"     TEXT,
    "access_token"      TEXT,
    "expires_at"        INTEGER,
    "token_type"        TEXT,
    "scope"             TEXT,
    "id_token"          TEXT,
    "session_state"     TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session"
(
    "id"           TEXT         NOT NULL,
    "sessionToken" TEXT         NOT NULL,
    "userId"       TEXT         NOT NULL,
    "expires"      TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User"
(
    "id"            TEXT         NOT NULL,
    "name"          TEXT,
    "email"         TEXT,
    "emailVerified" TIMESTAMP(3),
    "image"         TEXT,
    "role"          "Role"                DEFAULT 'VIEWER',
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment"
(
    "id"        TEXT            NOT NULL,
    "content"   TEXT            NOT NULL,
    "status"    "CommentStatus" NOT NULL DEFAULT 'QUESTION',
    "createdAt" TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)    NOT NULL,
    "projectId" TEXT            NOT NULL,
    "userId"    TEXT            NOT NULL
);

-- CreateTable
CREATE TABLE "Reply"
(
    "id"        TEXT            NOT NULL,
    "content"   TEXT            NOT NULL,
    "status"    "CommentStatus" NOT NULL DEFAULT 'REPLY',
    "createdAt" TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)    NOT NULL,
    "commentId" TEXT            NOT NULL,
    "userId"    TEXT            NOT NULL
);

-- CreateTable
CREATE TABLE "Like"
(
    "id"        TEXT         NOT NULL,
    "commentId" TEXT,
    "userId"    TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyId"   TEXT,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams"
(
    "id"          TEXT         NOT NULL,
    "name"        TEXT         NOT NULL,
    "description" TEXT         NOT NULL,
    "industry"    TEXT,
    "rating"      TEXT,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken"
(
    "identifier" TEXT         NOT NULL,
    "token"      TEXT         NOT NULL,
    "expires"    TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_members"
(
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account" ("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session" ("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reply_id_key" ON "Reply" ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_commentId_userId_key" ON "Like" ("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken" ("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken" ("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_members_AB_unique" ON "_members" ("A", "B");

-- CreateIndex
CREATE INDEX "_members_B_index" ON "_members" ("B");

-- AddForeignKey
ALTER TABLE "Project"
    ADD CONSTRAINT "Project_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
    ADD CONSTRAINT "Comment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply"
    ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply"
    ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like"
    ADD CONSTRAINT "Like_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members"
    ADD CONSTRAINT "_members_A_fkey" FOREIGN KEY ("A") REFERENCES "Teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members"
    ADD CONSTRAINT "_members_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
