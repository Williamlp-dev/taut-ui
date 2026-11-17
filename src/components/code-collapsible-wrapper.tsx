"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";

const COLLAPSED_MAX_HEIGHT = 256;

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const [expanded, setExpanded] = React.useState(false);
  const [measuredHeight, setMeasuredHeight] = React.useState<number | null>(
    null,
  );
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const regionId = React.useId();

  React.useLayoutEffect(() => {
    const element = bodyRef.current;
    if (!element) return;

    setMeasuredHeight(element.scrollHeight);

    const resizeObserver = new ResizeObserver(() => {
      if (bodyRef.current) {
        setMeasuredHeight(bodyRef.current.scrollHeight);
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  if (measuredHeight !== null && measuredHeight <= COLLAPSED_MAX_HEIGHT) {
    return (
      <div
        className={cn("[&_figure]:!mt-0 relative mt-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  const targetHeight =
    measuredHeight === null
      ? undefined
      : expanded
        ? measuredHeight
        : COLLAPSED_MAX_HEIGHT;

  return (
    <div
      className={cn(
        "group/collapsible [&_figure]:!mt-0 relative mt-6",
        className,
      )}
      {...props}
    >
      <div className="absolute top-1.5 right-10 z-10 flex h-8 items-center">
        <Button
          aria-controls={regionId}
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          size="xs"
          variant="ghost"
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
        <Separator className="mx-1 h-4" orientation="vertical" />
      </div>

      <div
        className={cn(
          "overflow-hidden transition-[height] duration-350 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
          !expanded && measuredHeight === null && "max-h-[256px]",
        )}
        id={regionId}
        style={{ height: targetHeight }}
      >
        <div ref={bodyRef}>{children}</div>
      </div>

      {!expanded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-24 items-end justify-center rounded-b-xl bg-gradient-to-t from-code via-code/85 to-transparent pb-4">
          <Button
            className="pointer-events-auto"
            onClick={() => setExpanded(true)}
            size="xs"
            variant="tonal"
          >
            <ChevronDownIcon className="size-3.5" />
            Expand
          </Button>
        </div>
      ) : null}
    </div>
  );
}
