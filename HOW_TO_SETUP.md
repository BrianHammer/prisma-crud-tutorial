## How to setup prisma

1. npm i prisma --save-dev

2. npx prisma init --datasource-provider sqlite
   if you use sqlite...
   npx prisma init --datasource-provider sqlite

3. Describe the database...

4. npx prisma db push

access the database: npx prisma studio

5. Instantiate prisma client:
   IMPORTANT AND HARD TO FIND!
   Prisma has docs for starting the client, and best practice:
   Link:
   https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

General rule:

a. prisma creates a global object first time it is called
b. if the object for the client is found, it will return the existing object
c. Otherwise it will create a new client, which will be the single one used

6. Seed your database with prisma's default seed.ts
   Link:
   https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

USEFUL FOR SEEDING:
{model}CreateInput is good for arrays of inputs
