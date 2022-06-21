-- CreateTable
CREATE TABLE "projectTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "projectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "tagId" INTEGER,

    CONSTRAINT "userTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "projectUrl" VARCHAR,
    "description" VARCHAR,
    "publishDate" TIMESTAMP(6),
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
