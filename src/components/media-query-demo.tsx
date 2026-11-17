"use client";

import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";

const BREAKPOINT_ITEMS = [
  { icon: Smartphone, label: "sm (640px)", query: "(min-width: 640px)" },
  { icon: Tablet, label: "md (768px)", query: "(min-width: 768px)" },
  { icon: Laptop, label: "lg (1024px)", query: "(min-width: 1024px)" },
  { icon: Monitor, label: "xl (1280px)", query: "(min-width: 1280px)" },
] as const;

function BreakpointBadge({
  icon: Icon,
  label,
  query,
}: (typeof BREAKPOINT_ITEMS)[number]): React.ReactElement {
  const matches = useMediaQuery(query);

  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-full px-3 font-medium text-xs",
        matches
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
      )}
    >
      <Icon className="me-1.5 size-3.5" />
      {label}
    </span>
  );
}

export function MediaQueryDemo(): React.ReactElement {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center gap-3">
        {BREAKPOINT_ITEMS.map((item) => (
          <BreakpointBadge key={item.label} {...item} />
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        Resize your browser window to test the media query breakpoints.
      </p>
    </div>
  );
}
