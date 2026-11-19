"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { Ripple } from "@/registry/default/lib/ripple";
import { cn } from "@/registry/default/lib/utils";

export const cardVariants = cva(
  [
    "relative flex rounded-3xl text-card-foreground outline-none",
    "transition-shadow duration-200 ease-out motion-reduce:transition-none",
    "[button&,a&]:cursor-pointer [button&,a&]:text-start",
    "[button&,a&]:focus-visible:ring-2 [button&,a&]:focus-visible:ring-ring [button&,a&]:focus-visible:ring-offset-2 [button&,a&]:focus-visible:ring-offset-background",
    "[button&]:disabled:pointer-events-none [button&]:disabled:opacity-38",
  ],
  {
    defaultVariants: { orientation: "vertical", variant: "default" },
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-center gap-4 p-4",
      },
      variant: {
        default: "bg-muted dark:bg-card [button&,a&]:hover:bg-accent",
        elevated:
          "bg-card shadow-[0_0.0625rem_0.1875rem_rgb(0_0_0/0.2),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.1)] [button&,a&]:hover:bg-accent",
        filled: "bg-muted dark:bg-card [button&,a&]:hover:bg-accent",
        outlined:
          "border border-border bg-background [button&,a&]:hover:bg-muted",
      },
    },
  },
);

export interface CardProps extends useRender.ComponentProps<"div"> {
  variant?: VariantProps<typeof cardVariants>["variant"];
  orientation?: VariantProps<typeof cardVariants>["orientation"];
  ripple?: boolean;
}

export function Card({
  className,
  variant,
  orientation = "vertical",
  ripple = false,
  render,
  children,
  ...props
}: CardProps): React.ReactElement {
  const defaultProps = {
    children: ripple ? (
      <>
        {children}
        <Ripple />
      </>
    ) : (
      children
    ),
    className: cn(cardVariants({ orientation, variant }), className),
    "data-orientation": orientation,
    "data-slot": "card",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardMedia({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative overflow-hidden rounded-3xl [&>img,&>video]:size-full [&>img,&>video]:object-cover",
      "in-data-[orientation=horizontal]:w-28 in-data-[orientation=horizontal]:shrink-0 in-data-[orientation=horizontal]:self-stretch in-data-[orientation=horizontal]:rounded-2xl",
      className,
    ),
    "data-slot": "card-media",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      "in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-2",
      "in-data-[orientation=horizontal]:min-w-0 in-data-[orientation=horizontal]:flex-1 in-data-[orientation=horizontal]:p-0",
      className,
    ),
    "data-slot": "card-header",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardTitle({
  className,
  size = "md",
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  size?: "md" | "lg";
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "font-heading font-semibold tracking-tight",
      size === "lg" ? "text-xl leading-7" : "text-lg leading-6",
      "in-data-[orientation=horizontal]:text-base",
      className,
    ),
    "data-slot": "card-title",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("text-muted-foreground text-sm leading-5", className),
    "data-slot": "card-description",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "col-start-2 row-span-2 row-start-1 inline-flex self-start in-data-[orientation=horizontal]:self-center justify-self-end",
      className,
    ),
    "data-slot": "card-action",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardPanel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex-1 p-6 in-[[data-slot=card]:has(>[data-slot=card-header])]:pt-2 in-[[data-slot=card]:has(>[data-slot=card-footer])]:pb-2",
      className,
    ),
    "data-slot": "card-panel",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFooter({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex items-center gap-2 p-6 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pt-2",
      className,
    ),
    "data-slot": "card-footer",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFrame({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-1 rounded-3xl bg-muted p-1.5 text-card-foreground",
      "*:data-[slot=card]:rounded-xl *:data-[slot=card]:bg-card *:data-[slot=card]:shadow-none *:data-[slot=card]:transition-none",
      "*:last:data-[slot=card]:rounded-b-2xl *:first:data-[slot=card]:rounded-t-2xl",
      "*:data-[slot=card]:[button&,a&]:hover:bg-accent *:data-[slot=card]:[button&,a&]:hover:shadow-none",
      className,
    ),
    "data-slot": "card-frame",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFrameHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "grid auto-rows-min grid-rows-[auto_auto] items-center gap-x-4 gap-y-0.5 px-5 py-4 has-data-[slot=card-frame-action]:grid-cols-[1fr_auto]",
      className,
    ),
    "data-slot": "card-frame-header",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFrameTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "font-heading font-semibold text-xl leading-7 tracking-tight",
      className,
    ),
    "data-slot": "card-frame-title",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFrameDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("text-muted-foreground text-sm leading-5", className),
    "data-slot": "card-frame-description",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFrameAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "col-start-2 row-span-2 row-start-1 inline-flex self-center justify-self-end",
      className,
    ),
    "data-slot": "card-frame-action",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFramePanel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex-1 rounded-2xl bg-card p-6", className),
    "data-slot": "card-frame-panel",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CardFrameFooter({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex items-center justify-between px-5 py-3", className),
    "data-slot": "card-frame-footer",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export { CardPanel as CardContent, CardFramePanel as CardFrameContent };
