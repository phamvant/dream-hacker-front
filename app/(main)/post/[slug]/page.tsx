import configuration from "@/app/config/configuration";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

export default async function Blog({ params }: { params: any }) {
  let markdown;

  try {
    const response = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/${params.slug}`,
      {
        headers: { Cookie: cookies().toString() },
      },
    );

    if (!response.ok) {
      redirect("/");
    }

    const body = await response.json();
    console.log(body.metadata.content);
    markdown = body.metadata.content;
  } catch (e) {
    redirect("/");
  }

  return (
    <section className="px-10 pb-10 bg-card border-border border rounded-lg">
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]"></h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]"></div>
      <article className="prose dark:prose-invert">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </article>
    </section>
  );
}
