import Link from "next/link";

function HighlightCard({ post }: { post: any }) {
  return (
    <div className="rounded-xl p-4 bg-card border border-border flex flex-col gap-4">
      <h1> {post.title}</h1>

      <h2 className="text-sm flex justify-end"> {post.username}</h2>
    </div>
  );
}

export default function HighlightArea({ posts }: { posts: any[] }) {
  return (
    <>
      <p className="text-2xl font-bold mb-5">Feature</p>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => {
          return (
            <Link href={`/post/${post.id}`} key={index}>
              <HighlightCard post={post} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
