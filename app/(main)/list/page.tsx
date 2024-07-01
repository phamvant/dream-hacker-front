import PostPreviewArea from "@/app/components/PostPreviewArea";
import { notFound } from "next/navigation";

export default async function List({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log(searchParams);
  if (!searchParams.category || !searchParams.page) {
    notFound();
  }

  return (
    <PostPreviewArea
      category={searchParams.category}
      page={searchParams.page}
    />
  );
}
