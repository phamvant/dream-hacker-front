import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-2/3 h-10 m-auto mt-10" />
      <Skeleton className="w-1/3 h-10 m-auto" />
      <Skeleton className="w-1/3 h-10 m-auto mb-20" />
      {Array.from({ length: 15 }, (_, index) => (
        <Skeleton key={index} className="w-4/5 h-10 m-auto" />
      ))}
    </div>
  );
}
