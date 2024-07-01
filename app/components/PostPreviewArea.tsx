import { notFound } from "next/navigation";
import { Post } from "../page";
import Link from "next/link";

function PostPreviewCard({ post }: { post: any }) {
  return (
    <div className="p-6 border-2 rounded-xl flex flex-col border-gray-100 gap-5">
      <h2 className="font-sans font-bold tracking-tighter text-primary text-md max-w-xl text-2xl text-slate-800/90">
        {post.title}
      </h2>
      <p className="text-gray-500">{post.title}</p>
      <div className="flex justify-between">
        <p className="text-gray-600 text-sm">筆者：トゥアン</p>
        <p className="text-gray-600 text-sm">日期：2024-04-19</p>
      </div>
    </div>
  );
}

export default async function PostPreviewArea({
  category,
  page,
}: {
  category: string;
  page: string;
}) {
  let posts: any[];
  try {
    const ret = await fetch(
      `http://localhost:8080/api/v1/post/list?category=${category}&page=${page}`,
    );

    if (!ret.ok) {
      notFound();
    }

    posts = await ret.json();

    console.log(posts);
  } catch (err) {
    console.log(err);
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post, idx) => (
        <Link href={"/post/" + post.id}>
          <PostPreviewCard post={post} />
        </Link>
      ))}
    </div>
  );
}
