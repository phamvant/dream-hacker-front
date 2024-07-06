import configuration from "@/app/config/configuration";
import { convertHTMLToJSX } from "@/app/lib/utils";
import { redirect } from "next/navigation";

export default async function Blog({ params }: { params: any }) {
  let html;

  try {
    const post = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/${params.slug}`,
    );

    if (!post.ok) {
      redirect("/");
    }

    const content = await new Response(post.body as ReadableStream).text();
    html = convertHTMLToJSX(content);
  } catch (e) {
    redirect("/");
  }

  return (
    <section className="px-10 pb-10 bg-card border-border border rounded-lg">
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]"></h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]"></div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: html ?? "" }} />
      </article>
    </section>
  );
}
