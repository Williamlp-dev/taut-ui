"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const tooltipPopupVariants = cva(
  [
    "text-(color:--tt-fg) relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance bg-(--tt-bg) outline-none",
    "forced-colors:border forced-colors:border-[CanvasText]",
    "[transition-duration:350ms,350ms,350ms,150ms] [transition-property:width,height,scale,opacity] [transition-timing-function:var(--spatial),var(--spatial),var(--spatial),ease] motion-reduce:transition-none",
    "data-ending-style:scale-60 data-starting-style:scale-60 data-ending-style:opacity-0 data-starting-style:opacity-0",
    "data-ending-style:[transition-duration:120ms] data-ending-style:[transition-timing-function:ease]",
    "data-instant:[transition-duration:0ms]",
  ],
  {
    defaultVariants: { variant: "plain" },
    variants: {
      variant: {
        plain:
          "max-w-60 rounded-xl font-medium text-xs leading-5 [--tt-bg:var(--color-foreground)] [--tt-fg:var(--color-background)] [--tt-px:0.75rem] [--tt-py:0.375rem]",
        rich: "min-w-28 max-w-80 rounded-2xl text-sm leading-5 shadow-lg/10 [--tt-bg:var(--color-popover)] [--tt-fg:var(--color-muted-foreground)] [--tt-px:1rem] [--tt-py:1rem]",
        vibrant:
          "max-w-60 rounded-xl font-medium text-xs leading-5 [--tt-bg:var(--color-primary)] [--tt-fg:var(--color-primary-foreground)] [--tt-px:0.75rem] [--tt-py:0.375rem]",
      },
    },
  },
);

export type TooltipVariant = NonNullable<
  VariantProps<typeof tooltipPopupVariants>["variant"]
>;

export const TooltipCreateHandle: typeof TooltipPrimitive.createHandle =
  TooltipPrimitive.createHandle;

export const TooltipProvider: typeof TooltipPrimitive.Provider =
  TooltipPrimitive.Provider;

export const Tooltip: typeof TooltipPrimitive.Root = TooltipPrimitive.Root;

export function TooltipTrigger(
  props: TooltipPrimitive.Trigger.Props,
): React.ReactElement {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipPopup({
  className,
  align = "center",
  sideOffset = 8,
  side = "top",
  anchor,
  children,
  portalProps,
  variant,
  ...props
}: TooltipPrimitive.Popup.Props &
  VariantProps<typeof tooltipPopupVariants> & {
    align?: TooltipPrimitive.Positioner.Props["align"];
    side?: TooltipPrimitive.Positioner.Props["side"];
    sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
    anchor?: TooltipPrimitive.Positioner.Props["anchor"];
    portalProps?: TooltipPrimitive.Portal.Props;
  }): React.ReactElement {
  return (
    <TooltipPrimitive.Portal {...portalProps}>
      <TooltipPrimitive.Positioner
        align={align}
        anchor={anchor}
        className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) [--spatial:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] [transition-duration:350ms] [transition-property:top,left,right,bottom,transform] [transition-timing-function:var(--spatial)] data-instant:transition-none motion-reduce:transition-none"
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(tooltipPopupVariants({ variant }), className)}
          data-slot="tooltip-popup"
          {...props}
        >
          <TooltipPrimitive.Viewport
            className="relative flex size-full flex-col gap-1 overflow-clip px-(--tt-px) py-(--tt-py) data-instant:transition-none **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--tt-px))] **:data-previous:w-[calc(var(--popup-width)-2*var(--tt-px))] **:data-previous:truncate **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity"
            data-slot="tooltip-viewport"
          >
            {children}
          </TooltipPrimitive.Viewport>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export function TooltipTitle({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("font-medium text-foreground", className)}
      data-slot="tooltip-title"
      {...props}
    />
  );
}

export function TooltipDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return <p className={className} data-slot="tooltip-description" {...props} />;
}

export function TooltipActions({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("-ms-2 mt-2 -mb-1 flex items-center gap-2", className)}
      data-slot="tooltip-actions"
      {...props}
    />
  );
}

export { TooltipPrimitive, TooltipPopup as TooltipContent };
