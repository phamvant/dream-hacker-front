"use client";

import { Button } from "./ui/button";

export default function CommentCreator() {
  return (
    <div>
      <p className="font-bold text-2xl mb-10">Comments</p>
      <div className="mb-10">
        <textarea
          className="w-full border-2 rounded-xl mb-2 p-2"
          placeholder="Share your opinion"
        />
        <div className="flex gap-4 justify-end">
          <Button variant={"outline"} className="rounded-full">
            Cancel
          </Button>
          <Button className="rounded-full">Comment</Button>
        </div>
      </div>
    </div>
  );
}
