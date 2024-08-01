import configuration from "@/app/config/configuration";
import { redirect } from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { Pencil } from "lucide-react";

export default async function Blog({ params }: { params: any }) {
  const session = await getServerSession(cookies());

  let data;

  try {
    const response = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/${params.slug}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      redirect("/");
    }

    const body = await response.json();
    data = body.metadata;
  } catch (e) {
    redirect("/");
  }

  return (
    <section className="px-2 md:px-10 pb-10 break-words w-fit m-auto mt-24">
      <div className="xl:w-[1000px]">
        <h1
          className="leading-relaxed mt-6 px-4 text-center font-heading text-3xl
        font-bold text-slate-900 dark:text-white md:mt-10 md:px-5 md:text-4xl md:leading-relaxed lg:px-8 xl:px-20 xl:text-5xl xl:leading-normal mb-5"
        >
          {data.title}
        </h1>
        <div className="flex gap-4 pb-6 justify-center mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <img
                src={data.avatar}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
            <p className="ml-2 font-semibold text-slate-600 dark:text-white md:ml-0">
              {data.username}
            </p>
            <div>・</div>
            <p className="text-sm">
              {(data.created_at as string).split("T")[0].replaceAll("-", "/")}
            </p>
            {session.role === "ADMIN" ||
            (session.role === "MODDER" && session.id === data.author_id) ? (
              <Link href={`/editor/${params.slug}`}>
                <Pencil size={30} className="p-1 border-2 rounded-xl" />
              </Link>
            ) : null}
          </div>
        </div>
        <article className="prose dark:prose-invert mt-20">
          <Markdown remarkPlugins={[remarkGfm]} className="block xl:w-[1000px]">
            {data.content}
          </Markdown>
        </article>
      </div>
    </section>
  );
}
