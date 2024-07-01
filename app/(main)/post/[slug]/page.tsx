import { convertHTMLToJSX } from "@/app/db/post";
import { notFound } from "next/navigation";

export default async function Blog({ params }: { params: any }) {
  let html;

  try {
    const post = await fetch(
      `http://localhost:8080/api/v1/post/${params.slug}`,
    );

    if (post.ok) {
      const content = await new Response(post.body as ReadableStream).text();
      html = convertHTMLToJSX(content);
    }
    if (!post) {
      notFound();
    }
  } catch (e) {
    notFound();
  }

  return (
    <section className="border-2 rounded-xl px-10 border-gray-100">
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]"></h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]"></div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: html! }} />
      </article>
    </section>
  );
}
