"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const badgeVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-transparent font-medium tabular-nums outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-38 data-disabled:pointer-events-none data-disabled:opacity-38",
    "[&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[button&,a&]:cursor-pointer [button&,a&]:pointer-coarse:after:absolute [button&,a&]:pointer-coarse:after:size-full [button&,a&]:pointer-coarse:after:min-h-11 [button&,a&]:pointer-coarse:after:min-w-11",
  ],
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-6 min-w-6 px-2.5 text-xs leading-4",
        dot: "size-2 p-0",
        lg: "h-7 min-w-7 px-3 text-sm leading-5 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-5 min-w-5 px-2 text-xs leading-4",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground [button&,a&]:hover:bg-[color-mix(in_oklab,var(--color-primary),var(--color-background)_10%)]",
        destructive:
          "bg-destructive text-destructive-foreground [button&,a&]:hover:bg-[color-mix(in_oklab,var(--color-destructive),var(--color-background)_10%)]",
        error: "bg-destructive-container text-destructive-container-foreground",
        info: "bg-[color-mix(in_oklab,var(--color-card),var(--color-info)_14%)] text-info-foreground dark:bg-[color-mix(in_oklab,var(--color-card),var(--color-info)_20%)] dark:text-info",
        outline:
          "border-border bg-card text-foreground [button&,a&]:hover:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground [button&,a&]:hover:bg-[color-mix(in_oklab,var(--color-secondary),var(--color-foreground)_8%)]",
        success:
          "bg-[color-mix(in_oklab,var(--color-card),var(--color-success)_14%)] text-success-foreground dark:bg-[color-mix(in_oklab,var(--color-card),var(--color-success)_20%)] dark:text-success",
        warning:
          "bg-[color-mix(in_oklab,var(--color-card),var(--color-warning)_14%)] text-warning-foreground dark:bg-[color-mix(in_oklab,var(--color-card),var(--color-warning)_20%)] dark:text-warning",
      },
    },
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
}

export function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(badgeVariants({ size, variant }), className),
    "data-size": size,
    "data-slot": "badge",
    "data-variant": variant,
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

export function BadgeAnchor({
  className,
  render,
  ...props
}: useRender.ComponentProps<"span">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative inline-flex shrink-0",
      "*:data-[slot=badge]:absolute",
      "*:data-[slot=badge]:data-[size=dot]:-end-0.5 *:data-[slot=badge]:data-[size=dot]:-top-0.5",
      "*:data-[slot=badge]:not-data-[size=dot]:start-1/2 *:data-[slot=badge]:not-data-[size=dot]:-top-1.5 *:data-[slot=badge]:not-data-[size=dot]:ms-0.5",
      className,
    ),
    "data-slot": "badge-anchor",
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}
