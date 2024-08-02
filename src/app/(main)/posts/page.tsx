import { createPost } from "@/actions/actions";
import db from "@/lib/db";
import Link from "next/link";

type Props = {};

export default async function PostsPage({}: Props) {
  const user = await db.user.findUnique({
    where: { email: "john@gmail.com" },
    include: { posts: true },
  });

  const posts = await db.post.findMany({
    /* Various options for searching, pagination, etc.

    // makes sure the title ends with post
    where: {
      title: { endsWith: "Post" },
    },

    // Orders by newest
    orderBy: {
      createdAt: "desc",
    },

    // Only get specific keys
    select: {
      id: true,
      title: true,
      slug: true,
    },

    // Used in pagination
    take: 1,
    skip: 1,
    */
  });

  const postsCount = await db.post.count();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Posts ({postsCount})</h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {user?.posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm"
        />

        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="px-2 py1 rounded-sm"
        />

        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Create Post
        </button>
      </form>
    </main>
  );
}

/* PREVIOUSLY WITH REACT:

-Writes a fetch to an endpoint, and wire up the endpoint to db
-Cumbersome, you do not need to create separate endpoints with nextJS
-Server components allow you to fetch data


export default async function PostsPage({}: Props) {
  "use client"

  useEffect(() => {
    fetch("/api/posts")
  }, [])

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Posts (0)</h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8"></ul>
    </main>
  );
}



*/

// - server components = fetch data = GET
// - server actions = post, put, patch, delete
// - route handlers (API)
//    - All CRUD acts, but cumbersome
//    - webhooks

// Formally for POST data..
// 1. have a function for obSubmit in the form
// 2. onSubmit function would make a fetch call with data
// 3. Must write the API call, make sure correct URL, wire them up

// NOW:
// 1. use 'action' attribute on form
// 2. create actions in a separate folder
