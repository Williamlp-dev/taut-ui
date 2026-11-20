import { Skeleton } from "@/registry/default/ui/skeleton";

export default function Particle() {
  return (
    <div className="flex w-80 flex-col gap-3.5">
      {["row-1", "row-2", "row-3"].map((id) => (
        <div className="flex items-center gap-3" key={id}>
          <Skeleton className="size-10 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-5 w-12 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  );
}
