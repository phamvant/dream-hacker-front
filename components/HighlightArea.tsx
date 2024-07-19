"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function HighlightCard({ post, className }: { post: any; className?: string }) {
  return (
    <div className={cn(`p-4 flex flex-col gap-4 border rounded-xl`, className)}>
      <h1> {post.title}</h1>
    </div>
  );
}

export default function HighlightArea({ posts }: { posts: any[] }) {
  const [isShowAll, setShowAll] = useState<boolean>(false);

  return (
    <>
      <p className="text-2xl font-bold mb-5">Feature</p>
      <div className={`flex flex-col gap-4`}>
        {posts.map((post, index) => {
          if (index < 4) {
            return (
              <Link href={`/post/${post.id}`} key={index}>
                <HighlightCard post={post} />
              </Link>
            );
          }
        })}
        <div
          className={`flex flex-col transition-all gap-4 duration-200 ${
            isShowAll ? "max-h-0" : "max-h-[999px]"
          } overflow-hidden`}
        >
          {posts.map((post, index) => {
            if (index > 3) {
              return (
                <Link href={`/post/${post.id}`} key={index}>
                  <HighlightCard post={post} />
                </Link>
              );
            }
          })}
        </div>
      </div>
      <Button
        className="w-full rounded-full mt-4"
        onClick={() => setShowAll((prev) => !prev)}
      >
        {!isShowAll ? "Show less" : "Show more"}
      </Button>
    </>
  );
}
