"use client";

import Link from "next/link";
import { BookMarked, CheckIcon, MessagesSquare, ThumbsUp } from "lucide-react";
import configuration from "@/app/config/configuration";
import { useState } from "react";

export interface IPost {
  id: string;
  title?: string;
  content?: string;
  likes: number;
  total_comments: number;
  saved: number;
  username: string;
  avatar: string;
  created_at: string;
  is_liked?: boolean;
  is_edited?: boolean;
}

function PostPreviewCard({ post, isAdmin }: { post: IPost; isAdmin: boolean }) {
  const [isLiked, setLiked] = useState<boolean>(post.is_liked ?? false);
  const [likes, setLikes] = useState<number>(post.likes);

  async function vote() {
    try {
      const ret = await fetch(
        `${configuration.APP.BACKEND_URL}/api/v1/post/${post.id}/vote`,
        {
          credentials: "include",
          method: !isLiked ? "POST" : "DELETE",
        }
      );

      if (ret.ok) {
        post.likes = isLiked ? post.likes - 1 : post.likes + 1;
        post.is_liked = !isLiked;
        setLiked((prev) => !prev);
        setLikes((prev) => {
          if (!isLiked) {
            return prev + 1;
          }
          return prev - 1;
        });
      }
    } catch (err) {}
  }

  return (
    <div className="p-4 rounded-xl flex flex-col bg-card border gap-4">
      <Link href={"/post/" + post.id} prefetch={true}>
        <h2 className="font-semibold max-w-2xl md:text-xl text-slate-900 dark:text-white mb-2">
          {post.title}
        </h2>
        <h2 className="text-slate-600 dark:text-slate-400 lg:max-w-[90%]">
          {post.content?.replace(/[\\?#*/]/g, "")}...
        </h2>
      </Link>
      <div className="flex justify-between">
        <div className="flex gap-8">
          <div
            className="z-20 flex items-center gap-4 cursor-pointer hover:scale-110 transition-all"
            onClick={() => vote()}
          >
            <ThumbsUp
              strokeWidth={1}
              size={20}
              className={`${
                isLiked ? "fill-blue-400" : ""
              } dark:text-white text-blue-600`}
            />
            <p className="text-sm">{likes}</p>
          </div>
          <Link
            className="flex items-center gap-4 hover:scale-110 transition-all"
            href={`/post/${post.id}`}
            prefetch={false}
          >
            <MessagesSquare
              strokeWidth={1}
              size={20}
              className="text-green-700 dark:fill-green-400"
            />
            <p className="text-sm">{post.total_comments}</p>
          </Link>
          <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
            <BookMarked
              strokeWidth={1}
              size={20}
              className="text-yellow-600 dark:text-yellow-400"
            />
            <p className="text-sm">{post.saved}</p>
          </div>
          {isAdmin && post.is_edited ? (
            <CheckIcon className="text-green-700" />
          ) : (
            ""
          )}
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

export default async function PostPreviewArea({
  posts,
  isAdmin = false,
}: {
  posts: IPost[];
  isAdmin: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-10">
      {posts.map((post, idx) => (
        <PostPreviewCard key={idx} post={post} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
