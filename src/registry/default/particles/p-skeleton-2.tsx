import { Skeleton } from "@/registry/default/ui/skeleton";

export default function Particle() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Skeleton className="h-36 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
