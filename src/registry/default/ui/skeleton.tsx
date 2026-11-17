import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export interface SkeletonProps extends React.ComponentProps<"div"> {}

export function Skeleton({
  className,
  ...props
}: SkeletonProps): React.ReactElement {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted motion-reduce:animate-none",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
