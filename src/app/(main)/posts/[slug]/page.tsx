import db from "@/lib/db";
import Link from "next/link";

type Props = {
  params: { slug: string };
};
const PostSingularPage = async ({ params: { slug } }: Props) => {
  const post = await db.post.findUnique({ where: { slug } });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
      <Link href="/posts">Go back</Link>
    </main>
  );
};

export default PostSingularPage;

//Ways of caching

/** 1. using cache function

import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache((slug) => {
  return db.post.findUnique({ where: { slug } });
});

...replace this with the db.post.findUnique({...})
const post = await getCachedPost(slug)
 */
