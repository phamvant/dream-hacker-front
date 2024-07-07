import { Post } from "@/app/page";
import PostPreviewArea from "@/components/PostPreviewArea";

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
