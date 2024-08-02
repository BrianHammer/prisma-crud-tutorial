import { Prisma, PrismaClient } from "@prisma/client";

// this is a one off script, so you can call the prismaclient here
const db = new PrismaClient();

// Type Post[] makes it a lot easier, and gives type checking
const initialPost: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    slug: "post-1",
    content: "Content of post one",
    author: {
      connectOrCreate: {
        where: { email: "john@gmail.com" },
        create: { email: "john@gmail.com", hashedPassword: "sajhflkjhkjhsfa" },
      },
    },
  },
  {
    title: "Post 2",
    slug: "post-2",
    content: "Content of post two",
    author: {
      connectOrCreate: {
        where: { email: "john@gmail.com" },
        create: { email: "john@gmail.com", hashedPassword: "sajhflkjhkjhsfa" },
      },
    },
  },
  {
    title: "Post 3",
    slug: "post-3",
    content: "Content of post three",
    author: {
      connectOrCreate: {
        where: { email: "john@gmail.com" },
        create: { email: "john@gmail.com", hashedPassword: "sajhflkjhkjhsfa" },
      },
    },
  },
  {
    title: "Post 4",
    slug: "post-4",
    content: "Content of post four",
    author: {
      connectOrCreate: {
        where: { email: "john@gmail.com" },
        create: { email: "john@gmail.com", hashedPassword: "sajhflkjhkjhsfa" },
      },
    },
  },
  {
    title: "Post 5",
    slug: "post-5",
    content: "Content of post five",
    author: {
      connectOrCreate: {
        where: { email: "john@gmail.com" },
        create: { email: "john@gmail.com", hashedPassword: "sajhflkjhkjhsfa" },
      },
    },
  },
];

////////////////////
// Main
////////////////////
async function main() {
  console.log("Start seeing...");

  // Loop through each initial post, wait, then create
  for (const post of initialPost) {
    const newPost = await db.post.create({ data: post });
    console.log(`Created post with id: ${newPost.id}`);
  }
}

// This executes the main code
main()
  .then(async () => {
    await db.$disconnect();
    console.log("Seeding was successful");
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
