"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

export type TableVariant = "default" | "card";

export type TableProps = React.ComponentProps<"table"> & {
  variant?: TableVariant;
  scrollFade?: boolean;
  render?: useRender.ComponentProps<"div">["render"];
};

export function Table({
  className,
  variant = "default",
  scrollFade = false,
  render,
  ...props
}: TableProps): React.ReactElement {
  const defaultProps = {
    children: (
      <ScrollArea scrollFade={scrollFade} scrollbarGutter>
        <table
          className={cn(
            "w-full caption-bottom in-data-[variant=card]:border-separate in-data-[variant=card]:border-spacing-0 text-sm",
            className,
          )}
          data-slot="table"
          {...props}
        />
      </ScrollArea>
    ),
    className: cn(
      "relative w-full",
      variant === "default" &&
        "overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
    ),
    "data-slot": "table-container",
    "data-variant": variant,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, {}),
    render,
  });
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">): React.ReactElement {
  return (
    <thead
      className={cn(
        "not-in-data-[variant=card]:bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_4%)] not-in-data-[variant=card]:[&_tr]:border-border not-in-data-[variant=card]:[&_tr]:border-b",
        className,
      )}
      data-slot="table-header"
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">): React.ReactElement {
  return (
    <tbody
      className={cn(
        "relative [&_tr:last-child]:border-0",
        "in-data-[variant=card]:*:[tr]:border-0 in-data-[variant=card]:*:[tr]:*:[td]:border-border in-data-[variant=card]:*:[tr]:*:[td]:border-b in-data-[variant=card]:*:[tr]:*:[td]:bg-card",
        "in-data-[variant=card]:*:[tr]:*:[td]:first:border-s in-data-[variant=card]:*:[tr]:first:*:[td]:border-t in-data-[variant=card]:*:[tr]:*:[td]:last:border-e",
        "in-data-[variant=card]:*:[tr]:first:*:[td]:first:rounded-ss-2xl in-data-[variant=card]:*:[tr]:last:*:[td]:last:rounded-ee-2xl in-data-[variant=card]:*:[tr]:first:*:[td]:last:rounded-se-2xl in-data-[variant=card]:*:[tr]:last:*:[td]:first:rounded-es-2xl",
        "in-data-[variant=card]:*:[tr]:hover:*:[td]:bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_3%)] in-data-[variant=card]:*:[tr]:data-[state=selected]:*:[td]:bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_6%)]",
        className,
      )}
      data-slot="table-body"
      {...props}
    />
  );
}

export function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">): React.ReactElement {
  return (
    <tfoot
      className={cn(
        "border-border border-t in-data-[variant=card]:border-none bg-transparent not-in-data-[variant=card]:bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_4%)] font-medium [&>tr]:last:border-b-0",
        className,
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">): React.ReactElement {
  return (
    <tr
      className={cn(
        "relative border-border border-b in-data-[slot=table-footer]:hover:bg-transparent in-data-[slot=table-header]:hover:bg-transparent not-in-data-[variant=card]:hover:bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_3%)] not-in-data-[variant=card]:data-[state=selected]:bg-[color-mix(in_oklab,var(--color-card),var(--color-foreground)_6%)]",
        className,
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.ComponentProps<"th">): React.ReactElement {
  return (
    <th
      className={cn(
        "h-10 whitespace-nowrap px-3.5 text-left align-middle font-medium text-muted-foreground text-xs leading-none has-[[role=checkbox]]:w-px last:has-[[role=checkbox]]:ps-0 first:has-[[role=checkbox]]:pe-0 sm:px-4",
        className,
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: React.ComponentProps<"td">): React.ReactElement {
  return (
    <td
      className={cn(
        "whitespace-nowrap bg-clip-padding px-3.5 in-data-[slot=table-footer]:py-3.5 py-3 align-middle leading-normal has-[[role=checkbox]]:w-px last:has-[[role=checkbox]]:ps-0 first:has-[[role=checkbox]]:pe-0 sm:px-4 sm:py-3.5",
        className,
      )}
      data-slot="table-cell"
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">): React.ReactElement {
  return (
    <caption
      className={cn(
        "in-data-[variant=card]:my-4 my-3 text-muted-foreground text-xs",
        className,
      )}
      data-slot="table-caption"
      {...props}
    />
  );
}
