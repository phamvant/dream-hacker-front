import configuration from "@/app/config/configuration";
import PostPreviewArea from "@/components/PostPreviewArea";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

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
    console.log(
      `${configuration.APP.BACKEND_URL}/api/v1/post?category=${searchParams.category}&page=${searchParams.page}`,
    );
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post?category=${searchParams.category}&page=${searchParams.page}`,
      {
        cache: "no-cache",
        credentials: "include",
        headers: { Cookie: cookies().toString() },
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
      redirect("/login");
    }
  }

  return <PostPreviewArea posts={posts} />;
}
