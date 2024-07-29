import configuration from "@/app/config/configuration";
import PostPreviewArea from "@/components/PostPreviewArea";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import HighlightArea from "@/components/HighlightArea";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function ListPagePaging({
  className,
  currentPage,
  currentCategory,
  totalPage,
}: {
  className?: string;
  currentPage: number;
  currentCategory: number;
  totalPage: number;
}) {
  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`list?category=${currentCategory}&page=${
              currentPage > 1 ? currentPage - 1 : 1
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            prefetch={false}
            href={`list?category=${currentCategory}&page=1`}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage < 4 ? (
          <>
            <PaginationLink
              prefetch={false}
              href={`list?category=${currentCategory}&page=2`}
              isActive={currentPage === 2}
            >
              2
            </PaginationLink>
            <PaginationLink
              prefetch={false}
              href={`list?category=${currentCategory}&page=3`}
              isActive={currentPage === 3}
            >
              3
            </PaginationLink>
            <PaginationLink
              prefetch={false}
              href={`list?category=${currentCategory}&page=4`}
              isActive={currentPage === 4}
            >
              4
            </PaginationLink>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationLink
              prefetch={false}
              href={`list?category=${currentCategory}&page=${currentPage - 1}`}
            >
              {currentPage - 1}
            </PaginationLink>
            <PaginationLink
              prefetch={false}
              href={`list?category=${currentCategory}&page=${currentPage}`}
              isActive={true}
            >
              {currentPage}
            </PaginationLink>
            {currentPage > 3 && currentPage < totalPage - 1 ? (
              <>
                <PaginationLink
                  prefetch={false}
                  href={`list?category=${currentCategory}&page=${
                    currentPage + 1
                  }`}
                >
                  {currentPage + 1}
                </PaginationLink>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {currentPage < totalPage ? (
          <PaginationItem>
            <PaginationLink
              prefetch={false}
              href={`list?category=${currentCategory}&page=${totalPage}`}
              isActive={currentPage === totalPage}
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <> </>
        )}
        <PaginationItem>
          <PaginationNext
            href={`list?category=${currentCategory}&page=${
              currentPage < totalPage ? currentPage + 1 : totalPage
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default async function List({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams.category || !searchParams.page) {
    notFound();
  }

  let totalPage: number = 0;

  let posts: any[] = [{}];
  try {
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post?category=${searchParams.category}&page=${searchParams.page}`,
      {
        credentials: "include",
        headers: { Cookie: cookies().toString() },
      }
    );

    if (!ret.ok) {
      throw new Error("Fetch failed");
    }

    const data = await ret.json();

    if (!data.metadata) {
      throw new Error("No data");
    }

    totalPage = data.metadata.totalPage;
    posts = data.metadata.posts;
  } catch (err) {
    console.log(err);
  } finally {
    if (!posts.length) {
      return notFound();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-10 pt-20 md:pt-0">
        <img src="banner.png" className="w-4/5 xl:w-2/5" />
      </div>
      <div className={cn(`grid grid-cols-3 gap-10 pt-10`)}>
        <div className="relative col-span-3 xl:col-span-2 rounded-lg">
          <Suspense
            fallback={
              <div className="flex flex-col gap-10">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index}>
                    <Skeleton className="w-full h-10 rounded-xl" />
                    <Skeleton className="w-1/2 h-10 rounded-xl" />
                  </div>
                ))}
              </div>
            }
          >
            <PostPreviewArea posts={posts} />
          </Suspense>

          <ListPagePaging
            className="mt-10"
            currentPage={Number(searchParams.page)}
            currentCategory={Number(searchParams.category)}
            totalPage={totalPage}
          />
        </div>
        <div className="relative hidden xl:block md:col-span-1">
          <Suspense
            fallback={
              <div className="flex flex-col gap-10">
                {Array.from({ length: 3 }, (_, index) => (
                  <div key={index}>
                    <Skeleton className="w-full h-10 rounded-xl mb-10" />
                    <Skeleton className="w-1/2 h-10 rounded-xl" />
                  </div>
                ))}
              </div>
            }
          >
            <HighlightArea />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
