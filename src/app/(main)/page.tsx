import Image from "next/image";

type Posts = {};

export default async function PostsPage({}: Posts) {
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      Home
    </main>
  );
}
