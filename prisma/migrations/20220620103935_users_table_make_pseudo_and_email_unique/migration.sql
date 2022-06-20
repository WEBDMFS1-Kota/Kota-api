/*
  Warnings:

  - A unique constraint covering the columns `[pseudo]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "projectTag" DROP CONSTRAINT "projectTag_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projectTag" DROP CONSTRAINT "projectTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "projectsUsers" DROP CONSTRAINT "projectsUsers_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projectsUsers" DROP CONSTRAINT "projectsUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "userTag" DROP CONSTRAINT "userTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "userTag" DROP CONSTRAINT "userTag_userId_fkey";

-- DropForeignKey
ALTER TABLE "usersVotes" DROP CONSTRAINT "usersVotes_projectId_fkey";

-- DropForeignKey
ALTER TABLE "usersVotes" DROP CONSTRAINT "usersVotes_userId_fkey";

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "publishDate" SET DATA TYPE TIMESTAMP(6);

-- CreateIndex
CREATE UNIQUE INDEX "users_pseudo_key" ON "users"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "projectTag" ADD CONSTRAINT "projectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectTag" ADD CONSTRAINT "projectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTag" ADD CONSTRAINT "userTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTag" ADD CONSTRAINT "userTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectsUsers" ADD CONSTRAINT "projectsUsers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectsUsers" ADD CONSTRAINT "projectsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersVotes" ADD CONSTRAINT "usersVotes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersVotes" ADD CONSTRAINT "usersVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
