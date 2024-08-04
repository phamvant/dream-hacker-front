import configuration from "@/app/config/configuration";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dot, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";

interface Comment {
  id: number;
  post_id: number;
  parent_id: number;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  username: string;
  avatar: string;
}

const renderComments = (comments: Comment[]) => {
  const renderComment = (comment: Comment) => (
    <div
      key={comment.id}
      style={{ marginLeft: comment.parent_id ? "20px" : "0px" }}
    >
      <div className="grid grid-cols-[min-content_1fr] gap-x-4 mb-6 items-center">
        <Avatar className="size-8 max-w-fit">
          <AvatarImage src={comment.avatar} />
          <AvatarFallback>USR</AvatarFallback>
        </Avatar>
        <div className="flex items-center">
          <p className="text-sm font-bold">{comment.username}</p>
          <Dot color="grey" />
          <p className="text-sm">{comment.updated_at.split("T")[0]}</p>
        </div>
        <div className="col-start-2 items-center">
          <p className="text-sm mt-2">{comment.content}</p>
          <div className="flex gap-4 mt-4">
            <div className="flex gap-4 items-center">
              <ThumbsUp
                className="hover:text-blue-600 cursor-pointer"
                size={15}
              />
              <span className="text-sm">0</span>
            </div>
            <div className="flex gap-4 items-center">
              <ThumbsDown
                className="hover:text-red-600 cursor-pointer"
                size={15}
              />
              <span className="text-sm">0</span>
            </div>
            <div className="flex gap-4 items-center">
              <MessageCircle
                className="hover:text-green-600 cursor-pointer"
                size={15}
              />
              <p className="text-sm">Reply</p>
            </div>
          </div>
          <div className="w-full bg-slate-400 h-[0.5px] mt-4"></div>
        </div>
      </div>
      {comments
        .filter((reply) => reply.parent_id === comment.id)
        .map((reply) => renderComment(reply))}
    </div>
  );

  return comments
    .filter((comment) => !comment.parent_id)
    .map((comment) => renderComment(comment));
};

export default async function Comments({ postId }: { postId: number }) {
  let comments: Comment[] = [];
  try {
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/${postId}/comment`
    );

    if (ret.ok) {
      const data = await ret.json();
      comments = data.metadata;
    }
  } catch (err) {
    comments = [];
  }

  return (
    <div>
      {comments.length ? (
        renderComments(comments)
      ) : (
        <div className="flex justify-center text-xl">No comment</div>
      )}
    </div>
  );
}
