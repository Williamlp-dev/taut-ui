"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import {
  type MorphShape,
  morphClasses,
  morphRadius,
  tautSize,
} from "@/registry/default/lib/morph";
import { Ripple } from "@/registry/default/lib/ripple";
import { cn } from "@/registry/default/lib/utils";
import { Spinner } from "@/registry/default/ui/spinner";

export const buttonVariants = cva(
  [
    "group relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap",
    "border-solid font-medium outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-38 data-disabled:pointer-events-none data-disabled:opacity-38",
    "[&_svg:not([class*='size-'])]:size-(--icon) [&_svg]:pointer-events-none [&_svg]:shrink-0",
    "pointer-coarse:after:-translate-1/2 pointer-coarse:after:absolute pointer-coarse:after:top-1/2 pointer-coarse:after:left-1/2 pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
  ],
  {
    defaultVariants: { variant: "default" },
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground data-[selected=false]:bg-muted data-[selected=false]:text-foreground",
        filled:
          "bg-primary text-primary-foreground data-[selected=false]:bg-muted data-[selected=false]:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground data-[selected=false]:bg-secondary/60",
        tonal:
          "bg-secondary text-secondary-foreground data-[selected=false]:bg-secondary/60",
        elevated: [
          "bg-[color-mix(in_oklab,var(--color-card),var(--color-primary)_5%)] text-primary",
          "shadow-[0_0.0625rem_0.125rem_0_rgb(0_0_0/0.3),0_0.0625rem_0.1875rem_0.0625rem_rgb(0_0_0/0.15)]",
          "hover:shadow-[0_0.0625rem_0.125rem_0_rgb(0_0_0/0.3),0_0.125rem_0.375rem_0.125rem_rgb(0_0_0/0.15)]",
          "active:shadow-[0_0.0625rem_0.125rem_0_rgb(0_0_0/0.3),0_0.0625rem_0.1875rem_0.0625rem_rgb(0_0_0/0.15)]",
          "disabled:shadow-none data-disabled:shadow-none",
          "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
        ],
        outline:
          "border border-border text-foreground data-[size=icon-xl]:border-2 data-[size=xl]:border-2 data-[selected=true]:border-transparent data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground",
        ghost: "text-foreground",
        text: "text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-outline":
          "border border-destructive/40 text-destructive data-[size=icon-xl]:border-2 data-[size=xl]:border-2",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof tautSize>["size"];
  width?: VariantProps<typeof tautSize>["width"];
  shape?: MorphShape;
  morph?: boolean;
  loading?: boolean;
  selected?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  width,
  shape = "round",
  morph = false,
  render,
  children,
  loading = false,
  selected,
  disabled: disabledProp,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled = Boolean(loading || disabledProp);
  const hasRenderElementChildren =
    React.isValidElement<{ children?: React.ReactNode }>(render) &&
    render.props.children !== undefined;
  const resolvedRender = hasRenderElementChildren
    ? React.cloneElement(render, { children: undefined })
    : render;
  const resolvedChildren =
    children ?? (hasRenderElementChildren ? render.props.children : undefined);

  const defaultProps = {
    children: (
      <>
        <Ripple disabled={isDisabled} />
        <span
          className={cn(
            "relative z-10 inline-flex items-center justify-center [gap:inherit]",
            loading && "invisible",
          )}
        >
          {resolvedChildren}
        </span>
        {loading && (
          <Spinner
            className="pointer-events-none absolute z-20"
            data-slot="button-loading-indicator"
          />
        )}
      </>
    ),
    className: cn(
      buttonVariants({ variant }),
      tautSize({ size, width }),
      morphClasses({
        press: morph,
        radius: morphRadius(shape, selected, morph),
      }),
      className,
    ),
    "aria-disabled": isDisabled || undefined,
    "aria-pressed": selected,
    "data-disabled": isDisabled ? "" : undefined,
    "data-loading": loading ? "" : undefined,
    "data-selected":
      selected === undefined ? undefined : selected ? "true" : "false",
    "data-size": size,
    "data-slot": "button",
    "data-variant": variant,
    disabled: resolvedRender ? undefined : isDisabled,
    type: (resolvedRender ? undefined : "button") as "button" | undefined,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render: resolvedRender,
  });
}
