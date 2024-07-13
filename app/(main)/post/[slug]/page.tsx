import configuration from "@/app/config/configuration";
import { redirect } from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

export default async function Blog({ params }: { params: any }) {
  let markdown;

  try {
    const response = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/${params.slug}`,
    );

    if (!response.ok) {
      redirect("/");
    }

    const body = await response.json();
    markdown = body.metadata.content;
  } catch (e) {
    redirect("/");
  }

  return (
    <section className="px-2 md:px-10 pb-10 md:pt-10 bg-card md:border rounded-lg">
      <div className="flex items-center gap-4 pb-6">
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src="https://avatar.iran.liara.run/public/48"
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
        <p className="text-sm">トゥアン</p>
        <div>・</div>
        <p className="text-sm">14/07/2024</p>
      </div>
      <article className="prose dark:prose-invert">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </article>
    </section>
  );
}
