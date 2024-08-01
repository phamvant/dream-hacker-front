import Link from "next/link";
import { BookMarked, MessagesSquare, ThumbsUp } from "lucide-react";

export interface Post {
  id: string;
  title: string;
  likes: number;
  total_comments: number;
  saved: number;
  username: string;
  avatar: string;
  created_at: string;
}

function PostPreviewCard({ post }: { post: Post }) {
  return (
    <div className="p-4 rounded-xl flex flex-col bg-card border gap-4">
      <h2 className="font-semibold max-w-2xl md:text-lg text-slate-900 dark:text-white">
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
        <div className="hidden lg:flex items-center gap-4">
          <p className="text-sm">{post.username}</p>
          <div>・</div>
          <p className="text-sm">
            {post.created_at.split("T")[0].replaceAll("-", "/")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function PostPreviewArea({ posts }: { posts: any[] }) {
  return (
    <div className="flex flex-col gap-4 md:gap-10">
      {posts.map((post, idx) => (
        <Link href={"/post/" + post.id} key={idx} prefetch={true}>
          <PostPreviewCard post={post} />
        </Link>
      ))}
    </div>
  );
}
