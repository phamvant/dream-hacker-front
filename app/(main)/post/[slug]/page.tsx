import configuration from "@/app/config/configuration";
import { redirect } from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Comment from "@/components/Comment";
import CommentCreator from "@/components/CommentCreator";

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
      <div className="xl:w-[1000px] mb-20">
        <h1
          className="leading-relaxed mt-6 px-4 text-center font-heading text-3xl
        font-bold text-slate-900 dark:text-white md:mt-10 md:px-5 md:text-4xl md:leading-relaxed lg:px-8 xl:px-20 xl:text-5xl xl:leading-normal mb-5"
        >
          {data.title_vn}
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
            {session &&
              (session.role === "ADMIN" ||
              (session.role === "MODDER" && session.id === data.author_id) ? (
                <Link href={`/editor/${params.slug}`}>
                  <Pencil size={30} className="p-1 border-2 rounded-xl" />
                </Link>
              ) : null)}
          </div>
        </div>
        <ContentArea data={data} />
      </div>

      <div>
        <div>
          <p className="font-bold text-2xl mb-4">Comments</p>
          <CommentCreator session={session} postId={params.slug} />
        </div>
        <div className="mt-10">
          <Comment postId={params.slug} />
        </div>
      </div>
    </section>
  );
}

const ContentArea = ({ data }: { data: any }) => {
  return (
    <>
      <input
        id="content_vn"
        className="peer/content_vn hidden"
        type="radio"
        name="status"
        defaultChecked
      />
      <input
        id="content_en"
        className="peer/content_en hidden"
        type="radio"
        name="status"
      />
      <input
        id="content_cn"
        className="peer/content_cn hidden"
        type="radio"
        name="status"
      />

      <label
        htmlFor="content_vn"
        className="peer-checked/content_vn:bg-primary peer-checked/content_vn:text-white p-1 rounded-md mr-2"
      >
        VN
      </label>
      <label
        htmlFor="content_en"
        className="peer-checked/content_en:bg-primary peer-checked/content_en:text-white p-1 rounded-md mr-2"
      >
        EN
      </label>
      <label
        htmlFor="content_cn"
        className="peer-checked/content_cn:bg-primary peer-checked/content_cn:text-white p-1 rounded-md mr-2"
      >
        CN
      </label>

      <article className="hidden peer-checked/content_vn:block prose dark:prose-invert mt-20">
        <Markdown remarkPlugins={[remarkGfm]} className="xl:w-[1000px]">
          {data.content_vn}
        </Markdown>
      </article>
      <article className="hidden peer-checked/content_en:block prose dark:prose-invert mt-20">
        <Markdown remarkPlugins={[remarkGfm]} className="xl:w-[1000px]">
          {data.content_en}
        </Markdown>
      </article>
      <article className="hidden peer-checked/content_cn:block prose dark:prose-invert mt-20">
        <Markdown remarkPlugins={[remarkGfm]} className="xl:w-[1000px]">
          {data.content_cn}
        </Markdown>
      </article>
    </>
  );
};
