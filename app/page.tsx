import { redirect } from "next/navigation";

export interface Post {
  id: string;
  title: string;
}

export default async function Home() {
  redirect("/list?category=1&page=2");

  return <div className="h-screen"></div>;
}
