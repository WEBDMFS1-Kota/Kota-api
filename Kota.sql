CREATE TABLE "users" (
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

CREATE TABLE "projects" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "title" varchar,
  "projectUrl" varchar,
  "description" varchar,
  "publishDate" date,
  "image" varchar,
  "upVote" int,
  "downVote" int
);

CREATE TABLE "projectsUsers" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "userId" int,
  "projectId" int
);

CREATE TABLE "tags" (
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
  "projectId" int,
  "tagId" int
);

CREATE TABLE "usersVotes" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "projectId" int,
  "voteValue" int
);

ALTER TABLE "projectsUsers" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "projectsUsers" ADD FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "userTag" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "userTag" ADD FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "projectTag" ADD FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "projectTag" ADD FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "usersVotes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "usersVotes" ADD FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE;