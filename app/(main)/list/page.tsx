import configuration from "@/app/config/configuration";
import PostPreviewArea, { IPost } from "@/components/PostPreviewArea";
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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "@/lib/auth/auth";

function BreadcrumbWithDropdown({
  className,
  categoryInfo,
  currentCategory,
}: {
  className?: string;
  categoryInfo: any;
  currentCategory: number;
}) {
  return (
    <Breadcrumb
      className={`${className} border-[1px] rounded-xl w-fit p-2 px-4`}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Link
            href={`list?category=${currentCategory}&page=1`}
            className="hover:text-slate-900"
          >
            {categoryInfo.programName}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{categoryInfo.categoryName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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

  const session = await getServerSession(cookies());

  let categoryInfo: any = {};

  let posts: IPost[] = [];
  try {
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}${
        session
          ? session.role === "ADMIN"
            ? "/admin/"
            : "/api/v1/"
          : "/api/v1/"
      }category?id=${searchParams.category}&page=${searchParams.page}`,
      {
        cache: "no-cache",
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

    categoryInfo = data.metadata.categoryInfo;
    posts = data.metadata.posts;
  } catch (err) {
  } finally {
    if (!posts.length) {
      redirect("/list?category=11&page=1");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-10 pt-20 md:pt-0 -z-50">
        <img src="banner.png" className="w-4/5 xl:w-2/5 dark:invert -z-50" />
      </div>
      <div className={cn(`grid grid-cols-3 gap-10 pt-10`)}>
        <div className="relative col-span-3 xl:col-span-2 rounded-lg">
          <BreadcrumbWithDropdown
            className="mb-4 md:mb-10"
            categoryInfo={categoryInfo}
            currentCategory={Number(searchParams.category)}
          />
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
            <PostPreviewArea
              posts={posts}
              isAdmin={session && session.role === "ADMIN"}
            />
          </Suspense>

          <ListPagePaging
            className="mt-10"
            currentPage={Number(searchParams.page)}
            currentCategory={Number(searchParams.category)}
            totalPage={categoryInfo.totalPage}
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
