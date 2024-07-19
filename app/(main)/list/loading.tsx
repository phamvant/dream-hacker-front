import { Post } from "@/app/page";
import HighlightArea from "@/components/HighlightArea";
import PostPreviewArea from "@/components/PostPreviewArea";
import { cn } from "@/lib/utils";

export default function Loading() {
  let post: Post = {
    id: "",
    title: "",
    likes: 0,
    total_comments: 0,
    saved: 0,
    username: "",
    avatar: "",
    created_at: "",
  };

  let posts = Array.from({ length: 10 }, (_, index) => post);

  return (
    <div>
      <div className="flex items-center justify-center gap-10 pt-20 md:pt-0">
        <img src="banner.png" className="w-2/5 dark:invert" />
      </div>
      <div className={cn(`grid grid-cols-3 gap-10 pt-10`)}>
        <div className="relative col-span-3 xl:col-span-2 rounded-lg">
          <PostPreviewArea posts={posts} />
        </div>
        <div className="relative hidden xl:block md:col-span-1">
          <HighlightArea posts={posts} />
        </div>
      </div>
    </div>
  );
}
