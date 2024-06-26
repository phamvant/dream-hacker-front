import { notFound } from "next/navigation";
import { getPost } from "@/app/db/post";

export default async function Blog({ params }: { params: any }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]"></h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]"></div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post }} />
      </article>
    </section>
  );
}
