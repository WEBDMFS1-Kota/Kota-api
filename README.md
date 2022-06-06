# Kota-api

## Getting started

Install nodejs 18.2.0
Install docker
Run the database with:

```
docker-compose up -d
```

Install node modules with

```bash
npm i
```

then start the server with

```bash
npm run dev
```

## Prisma

Create a .env file with the .env.template

Change postgres database schema (with editor for example)

Run `npx prisma db pull`

Run `npx prisma generate`

Run `npx prisma migrate dev` if database doesn't exist or isn't up to date

# Erreur date 2022-06-06T00:00:00.000Z

publishDate DateTime? @db.Date
-> à modifier
publishDate String? @db.Date
