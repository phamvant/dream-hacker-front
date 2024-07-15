import configuration from "@/app/config/configuration";
import { redirect } from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

export default async function Blog({ params }: { params: any }) {
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
    <section className="px-2 md:px-10 pb-10 md:pt-10 bg-card md:border rounded-lg break-words">
      <div className="flex items-center gap-4 pb-6">
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
        <p className="text-sm">{data.username}</p>
        <div>・</div>
        <p className="text-sm">
          {(data.created_at as string).split("T")[0].replaceAll("-", "/")}
        </p>
      </div>
      <article className="prose dark:prose-invert">
        <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
      </article>
    </section>
  );
}
