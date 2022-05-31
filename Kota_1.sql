CREATE TABLE "user" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "pseudo" varchar,
  "avatar" varchar,
  "firstname" varchar,
  "lastname" varchar,
  "password" varchar,
  "email" varchar,
  "birthDate" date,
  "githubProfileURL" varchar
);

CREATE TABLE "project" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "title" varchar,
  "projectUrl" varchar,
  "description" varchar,
  "publishDate" date,
  "image" varchar,
  "upVote" int,
  "downVote" int
);

CREATE TABLE "projectUser" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "userId" int,
  "projectId" int
);

CREATE TABLE "tag" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "userTag" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "userId" int,
  "tagId" int
);

CREATE TABLE "projectTag" (
  "id" SERIAL PRIMARY KEY,
  "peojectId" int,
  "tagId" int
);

ALTER TABLE "projectUser" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "projectUser" ADD FOREIGN KEY ("projectId") REFERENCES "project" ("id");

ALTER TABLE "userTag" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "userTag" ADD FOREIGN KEY ("tagId") REFERENCES "tag" ("id");

ALTER TABLE "projectTag" ADD FOREIGN KEY ("peojectId") REFERENCES "project" ("id");

ALTER TABLE "projectTag" ADD FOREIGN KEY ("tagId") REFERENCES "tag" ("id");
