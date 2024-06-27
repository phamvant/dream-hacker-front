import Link from "next/link";
import { getAllPost } from "../db/post";
import { cookies } from "next/headers";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const regex = /(\d+)\.html$/;

  let allBlogs = (await getAllPost())[0]
    .map((category) => category.post)
    .flat(2);

  console.log(allBlogs);

  const getUser = async () => {
    fetch("http://localhost:8080/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookies().toString(),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response) => {
        console.log(response.body);
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        console.log(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  await getUser();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {allBlogs.map((post, idx) => (
        <Link
          key={idx}
          // key={post.match(regex)![1]}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.match(regex)![1]}`}
        >
          <div className="w-full flex flex-col">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.split("contents/")[1].split(".html")[0]}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
