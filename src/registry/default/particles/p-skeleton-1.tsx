import { Skeleton } from "@/registry/default/ui/skeleton";

export default function Particle() {
  return (
    <div className="flex w-72 items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
