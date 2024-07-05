import PostPreviewArea from "@/app/components/PostPreviewArea";
import { Post } from "@/app/page";

const posts: Post[] = [
  {
    id: "",
    title: "",
  },
  {
    id: "",
    title: "",
  },
  {
    id: "",
    title: "",
  },
  {
    id: "",
    title: "",
  },
  {
    id: "",
    title: "",
  },
  {
    id: "",
    title: "",
  },
  {
    id: "",
    title: "",
  },
];

export default function Loading() {
  return <PostPreviewArea posts={posts} />;
}
