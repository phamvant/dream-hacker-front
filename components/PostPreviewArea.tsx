import { Post } from "@/app/page";
import Link from "next/link";

function PostPreviewCard({ post }: { post: Post }) {
  return (
    <div className="p-6 rounded-xl flex flex-col bg-card border border-border gap-5">
      <h2 className="font-sans font-bold tracking-tighter text-md max-w-xl text-2xl text-primary">
        {post.title}
      </h2>
      <p className="text-primary/80">{post.title}</p>
      <div className="flex justify-between">
        <p className="text-primary/80 text-sm">筆者：トゥアン</p>
        <p className="text-primary/80 text-sm">日期：2024-04-19</p>
      </div>
    </div>
  );
}

export default async function PostPreviewArea({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-10">
      {posts.map((post, idx) => (
        <Link href={"/post/" + post.id} key={idx} prefetch={true}>
          <PostPreviewCard post={post} />
        </Link>
      ))}
    </div>
  );
}
