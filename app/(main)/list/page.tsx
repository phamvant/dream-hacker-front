import PostPreviewArea from "@/app/components/PostPreviewArea";
import { notFound } from "next/navigation";

export default async function List({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams.category || !searchParams.page) {
    notFound();
  }

  let posts: any[];
  try {
    const ret = await fetch(
      `http://localhost:8080/api/v1/post/list?category=${searchParams.category}&page=${searchParams.page}`,
      {
        cache: "no-cache",
      },
    );

    if (!ret.ok) {
      notFound();
    }

    posts = (await ret.json()).metadata;
  } catch (err) {
    console.log(err);
    notFound();
  }

  return <PostPreviewArea posts={posts} />;
}
