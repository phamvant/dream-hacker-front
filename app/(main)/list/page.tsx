import PostPreviewArea from "@/app/components/PostPreviewArea";
import configuration from "@/app/config/configuration";
import { notFound, redirect } from "next/navigation";

export default async function List({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams.category || !searchParams.page) {
    notFound();
  }

  let posts: any[] = [];

  try {
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/list?category=${searchParams.category}&page=${searchParams.page}`,
      {
        cache: "no-cache",
      },
    );

    const postsData = (await ret.json()).metadata;

    if (postsData) {
      posts = postsData;
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (!posts.length) {
      redirect("/");
    }
  }

  return <PostPreviewArea posts={posts} />;
}
