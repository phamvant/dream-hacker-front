"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import configuration from "@/app/config/configuration";
import { StateButton } from "./StateButton";

export default function CommentCreator({
  session,
  postId,
}: {
  session: any;
  postId: number;
}) {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [commentStatus, setCommentStatus] = useState<
    "done" | "error" | "fetching" | "idle"
  >("idle");

  const submitComment = async ({ parentId }: { parentId?: number }) => {
    try {
      const content = commentRef.current?.value;

      if (!content) {
        setCommentStatus("error");
        setTimeout(() => {
          setCommentStatus("idle");
        }, 3000);
      }

      setCommentStatus("fetching");
      const ret = await fetch(
        `${configuration.APP.BACKEND_URL}/api/v1/comment`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            postId,
            content,
            parentId: parentId ?? null,
          }),
        }
      );

      if (ret.ok) {
        setCommentStatus("done");
      }
    } catch (err) {
      setCommentStatus("error");
    }
  };

  return !session ? (
    <Button className="rounded-full">
      <a href="/login">Login to comment</a>
    </Button>
  ) : (
    <div className="mb-10">
      <textarea
        className="w-full border-2 rounded-xl mb-2 p-2"
        placeholder="Share your opinion"
        ref={commentRef}
      />
      <div className="flex gap-4 justify-end">
        <Button variant={"outline"} className="rounded-full">
          Cancel
        </Button>
        <StateButton
          className="rounded-full"
          status={commentStatus}
          state={{
            done: "Posted",
            error: "Error",
            fetching: "Uploading",
            idle: "Comment",
          }}
          onClick={() => submitComment({})}
        >
          Comment
        </StateButton>
      </div>
    </div>
  );
}
