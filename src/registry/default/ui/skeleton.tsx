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
        "animate-pulse rounded-lg bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_8%)] motion-reduce:animate-none",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
