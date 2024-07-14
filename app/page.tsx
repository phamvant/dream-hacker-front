import { redirect } from "next/navigation";

export interface Post {
  id: string;
  title: string;
  likes: number;
  total_comments: number;
  saved: number;
  username: string;
  created_at: string;
}

export default async function Home() {
  redirect("/list?category=1&page=1");

  return <div className="h-screen"></div>;
}
