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

function ListPagePaging({
  className,
  currentPage,
  totalPage,
}: {
  className?: string;
  currentPage: number;
  totalPage: number;
}) {
  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`list?category=1&page=${
              currentPage > 1 ? currentPage - 1 : 1
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={"list?category=1&page=1"}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage < 4 ? (
          <>
            <PaginationLink
              prefetch={true}
              href={"list?category=1&page=2"}
              isActive={currentPage === 2}
            >
              2
            </PaginationLink>
            <PaginationLink
              prefetch={true}
              href={"list?category=1&page=3"}
              isActive={currentPage === 3}
            >
              3
            </PaginationLink>
            <PaginationLink
              prefetch={true}
              href={"list?category=1&page=4"}
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
              prefetch={true}
              href={`list?category=1&page=${currentPage - 1}`}
            >
              {currentPage - 1}
            </PaginationLink>
            <PaginationLink
              prefetch={true}
              href={`list?category=1&page=${currentPage}`}
              isActive={true}
            >
              {currentPage}
            </PaginationLink>
            {currentPage > 3 && currentPage < totalPage - 1 ? (
              <>
                <PaginationLink
                  prefetch={true}
                  href={`list?category=1&page=${currentPage + 1}`}
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
              prefetch={true}
              href={`list?category=1&page=${totalPage}`}
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
            prefetch={true}
            href={`list?category=1&page=${
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

  let posts: any[] = [];
  let totalPage: number = 0;

  try {
    console.log(
      `${configuration.APP.BACKEND_URL}/api/v1/post?category=${searchParams.category}&page=${searchParams.page}`
    );
    const ret = await fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post?category=${searchParams.category}&page=${searchParams.page}`,
      {
        cache: "no-cache",
        credentials: "include",
        headers: { Cookie: cookies().toString() },
      }
    );

    const postsData = (await ret.json()).metadata;

    if (postsData) {
      posts = postsData.posts;
      totalPage = postsData.totalPage;
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (!posts.length) {
      redirect("/login");
    }
  }

  return (
    <div>
      <PostPreviewArea posts={posts} />
      <ListPagePaging
        className="mt-10"
        currentPage={Number(searchParams.page)}
        totalPage={totalPage}
      />
    </div>
  );
}
