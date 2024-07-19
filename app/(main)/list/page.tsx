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

  let posts: any[] = [];
  let totalPage: number = 0;
  let featurePosts: any;

  try {
    const fetchPage = fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post?category=${searchParams.category}&page=${searchParams.page}`,
      {
        cache: "no-cache",
        credentials: "include",
        headers: { Cookie: cookies().toString() },
      }
    );

    const fetchFeature = fetch(
      `${configuration.APP.BACKEND_URL}/api/v1/post/feature?number=10`,
      {
        cache: "no-cache",
        credentials: "include",
      }
    );

    const [pagePost, featurePost] = await Promise.all([
      fetchPage,
      fetchFeature,
    ]);

    const postsData = await pagePost.json();
    const featurePostsData = await featurePost.json();

    if (featurePostsData.metadata) {
      featurePosts = featurePostsData.metadata;
    }

    if (postsData.metadata) {
      posts = postsData.metadata.posts;
      totalPage = postsData.metadata.totalPage;
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
      <div className="flex items-center justify-center gap-10 pt-20 md:pt-0">
        <img src="banner.png" className="w-2/5 dark:invert" />
      </div>
      <div className={cn(`grid grid-cols-3 gap-10 pt-10`)}>
        <div className="relative col-span-3 xl:col-span-2 rounded-lg">
          <PostPreviewArea posts={posts} />
          <ListPagePaging
            className="mt-10"
            currentPage={Number(searchParams.page)}
            currentCategory={Number(searchParams.category)}
            totalPage={totalPage}
          />
        </div>
        <div className="relative hidden xl:block md:col-span-1">
          <HighlightArea posts={featurePosts} />
        </div>
      </div>
    </div>
  );
}
