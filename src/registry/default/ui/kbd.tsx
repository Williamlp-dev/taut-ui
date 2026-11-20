import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded-md px-1.5",
        "bg-background text-muted-foreground shadow-[inset_0_0_0_0.0625rem_var(--color-border)]",
        "font-medium font-mono text-xs tabular-nums leading-4 tracking-tight",
        "[&_svg:not([class*='size-'])]:size-3 [&_svg]:shrink-0",
        className,
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

export function KbdGroup({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn("inline-flex items-center gap-1", className)}
      data-slot="kbd-group"
      {...props}
    />
  );
}
