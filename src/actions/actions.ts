"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const formatStringIntoSlug = (str: string) =>
  str.replace(/\s+/g, "-").toLowerCase();

export const createPost = async (formData: FormData) => {
  try {
    await db.post.create({
      data: {
        title: formData.get("title") as string,
        slug: formatStringIntoSlug(formData.get("title") as string),
        content: formData.get("content") as string,
        author: {
          connect: { email: "brianhammer777@yahoo.com" },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
  }

  revalidatePath("/posts");
};

export const editPost = async (formData: FormData, id: string) => {
  await db.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: formatStringIntoSlug(formData.get("slug") as string),
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/posts");
};

export const deletePost = async (id: string) => {
  await db.post.delete({ where: { id } });

  revalidatePath("/posts");
};
