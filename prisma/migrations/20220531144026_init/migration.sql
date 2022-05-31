-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "projectUrl" VARCHAR,
    "description" VARCHAR,
    "publishDate" DATE,
    "image" VARCHAR,
    "upVote" INTEGER,
    "downVote" INTEGER,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectTag" (
    "id" SERIAL NOT NULL,
    "peojectId" INTEGER,
    "tagId" INTEGER,

    CONSTRAINT "projectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "projectId" INTEGER,

    CONSTRAINT "projectUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "pseudo" VARCHAR,
    "avatar" VARCHAR,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "password" VARCHAR,
    "email" VARCHAR,
    "birthDate" DATE,
    "githubProfileURL" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userTag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "tagId" INTEGER,

    CONSTRAINT "userTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projectTag" ADD CONSTRAINT "projectTag_peojectId_fkey" FOREIGN KEY ("peojectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectTag" ADD CONSTRAINT "projectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectUser" ADD CONSTRAINT "projectUser_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projectUser" ADD CONSTRAINT "projectUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTag" ADD CONSTRAINT "userTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "userTag" ADD CONSTRAINT "userTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
