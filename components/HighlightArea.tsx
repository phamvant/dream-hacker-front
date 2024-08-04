import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import configuration from "@/app/config/configuration";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ListFilter } from "lucide-react";

function HighlightCard({ post, className }: { post: any; className?: string }) {
  return (
    <div className={cn(`p-4 flex flex-col gap-4 border rounded-xl`, className)}>
      <h1> {post.title}</h1>
    </div>
  );
}

export default async function HighlightArea() {
  let posts: any[] = [];

  try {
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/feature?number=10`,
      {
        cache: "no-cache",
        credentials: "include",
      }
    );

    if (!ret.ok) {
      throw new Error("Fetch failed");
    }

    const data = await ret.json();

    if (!data.metadata) {
      throw new Error("No data");
    }

    posts = data.metadata;
  } catch (err) {
  } finally {
    if (!posts.length) {
      // return notFound();
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="text-2xl font-bold mb-5">Feature</p>
        <p className="text-2xl font-bold mb-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem defaultChecked>
                Week
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Month</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Year</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      </div>
      <div className={`flex flex-col gap-4`}>
        {posts.map((post, index) => {
          if (index < 4) {
            return (
              <Link href={`/post/${post.id}`} key={index}>
                <HighlightCard post={post} />
              </Link>
            );
          }
        })}
        <input type="checkbox" id="toggle" className="peer hidden" />
        <div
          className={`flex flex-col transition-all gap-4 duration-200 max-h-0 peer-checked:max-h-[999px] overflow-hidden`}
        >
          {posts.map((post, index) => {
            if (index > 3) {
              return (
                <Link href={`/post/${post.id}`} key={index}>
                  <HighlightCard post={post} />
                </Link>
              );
            }
          })}
        </div>
      </div>
      <Button asChild className="w-full rounded-full mt-4">
        <label htmlFor="toggle" className="cursor-pointer">
          <span className="peer-checked:hidden">Expand / Colapse</span>
        </label>
      </Button>
    </>
  );
}
