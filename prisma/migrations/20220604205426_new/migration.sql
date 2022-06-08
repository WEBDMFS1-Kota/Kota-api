/*
  Warnings:

  - You are about to drop the column `peojectId` on the `projectTag` table. All the data in the column will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projectUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "projectTag" DROP CONSTRAINT "projectTag_peojectId_fkey";

-- DropForeignKey
ALTER TABLE "projectTag" DROP CONSTRAINT "projectTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "projectUser" DROP CONSTRAINT "projectUser_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projectUser" DROP CONSTRAINT "projectUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "userTag" DROP CONSTRAINT "userTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "userTag" DROP CONSTRAINT "userTag_userId_fkey";

-- AlterTable
ALTER TABLE "projectTag" DROP COLUMN "peojectId",
ADD COLUMN     "projectId" INTEGER;

-- DropTable
DROP TABLE "project";

-- DropTable
DROP TABLE "projectUser";

-- DropTable
DROP TABLE "tag";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "projectUrl" VARCHAR,
    "description" VARCHAR,
    "publishDate" DATE,
    "image" VARCHAR,
    "upVote" INTEGER,
    "downVote" INTEGER,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectsUsers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "projectsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "pseudo" VARCHAR,
    "avatar" VARCHAR,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "password" VARCHAR,
    "email" VARCHAR,
    "birthDate" DATE,
    "githubProfileURL" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersVotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "projectId" INTEGER,
    "voteValue" INTEGER,

    CONSTRAINT "usersVotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projectTag" ADD CONSTRAINT "projectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectTag" ADD CONSTRAINT "projectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTag" ADD CONSTRAINT "userTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTag" ADD CONSTRAINT "userTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectsUsers" ADD CONSTRAINT "projectsUsers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectsUsers" ADD CONSTRAINT "projectsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usersVotes" ADD CONSTRAINT "usersVotes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usersVotes" ADD CONSTRAINT "usersVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
