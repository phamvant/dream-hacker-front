"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

function HighlightCard({ post }: { post: any }) {
  return (
    <div className="rounded-xl p-4 bg-card border border-border flex flex-col gap-4">
      <h1> {post.title}</h1>

      <h2 className="text-sm flex justify-end"> {post.username}</h2>
    </div>
  );
}

export default function HighlightArea({ posts }: { posts: any[] }) {
  const [isShowAll, setShowAll] = useState<boolean>(false);

  return (
    <>
      <p className="text-2xl font-bold mb-5">Feature</p>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => {
          return (
            <Link
              href={`/post/${post.id}`}
              key={index}
              className={`${!isShowAll && index > 4 ? "hidden" : "static"}`}
            >
              <HighlightCard post={post} />
            </Link>
          );
        })}
      </div>
      <Button
        className="w-full rounded-full mt-5"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {isShowAll ? "Show less" : "Show more"}
      </Button>
    </>
  );
}
