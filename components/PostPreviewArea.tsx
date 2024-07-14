import { Post } from "@/app/page";
import Link from "next/link";
import { Button } from "./ui/button";
import { BookMarked, MessagesSquare, ThumbsUp } from "lucide-react";

function PostPreviewCard({ post }: { post: Post }) {
  return (
    <div className="p-6 rounded-xl flex flex-col bg-card border border-border gap-5">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src="https://avatar.iran.liara.run/public/48"
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
        <p className="text-sm">{post.username}</p>
        <div>・</div>
        <p className="text-sm">
          {post.created_at.split("T")[0].replaceAll("-", "/")}
        </p>
      </div>
      <h2 className="font-bold text-md max-w-2xl text-2xl text-slate-700 dark:text-white">
        {post.title}
      </h2>
      <div className="flex justify-between">
        <div className="flex gap-8">
          <div className="flex items-center gap-4">
            <ThumbsUp
              strokeWidth={1}
              size={20}
              className="text-blue-700 dark:text-blue-400"
            />
            <p className="text-sm">{post.likes}</p>
          </div>
          <div className="flex items-center gap-4">
            <MessagesSquare
              strokeWidth={1}
              size={20}
              className="text-green-700 dark:text-green-400"
            />
            <p className="text-sm">{post.total_comments}</p>
          </div>
          <div className="flex items-center gap-4">
            <BookMarked
              strokeWidth={1}
              size={20}
              className="text-yellow-600 dark:text-yellow-400"
            />
            <p className="text-sm">{post.saved}</p>
          </div>
        </div>
        <p className=" text-sm border-2 rounded-full p-1 px-2">Category</p>
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
