"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const popoverPopupVariants = cva(
  [
    "text-(color:--pop-fg) relative flex max-h-(--available-height) min-w-10 max-w-80 origin-(--transform-origin) flex-col gap-1.5 overflow-y-auto rounded-3xl bg-(--pop-bg) p-4 outline-none",
    "shadow-[0_0_0_0.0625rem_var(--pop-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)]",
    "[transition-duration:350ms,150ms] [transition-property:scale,opacity] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1),ease] motion-reduce:transition-none",
    "data-starting-style:scale-75 data-starting-style:opacity-0",
    "data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:[transition-duration:100ms] data-ending-style:[transition-timing-function:ease]",
  ],
  {
    defaultVariants: { colorScheme: "standard" },
    variants: {
      colorScheme: {
        standard:
          "[--pop-bg:color-mix(in_oklab,var(--color-popover),var(--color-primary)_8%)] [--pop-fg:var(--color-popover-foreground)] [--pop-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_22%)]",
        vibrant:
          "[--pop-bg:color-mix(in_oklab,var(--color-popover),var(--color-primary)_18%)] [--pop-fg:var(--color-secondary-foreground)] [--pop-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_32%)]",
      },
    },
  },
);

export const PopoverCreateHandle: typeof PopoverPrimitive.createHandle =
  PopoverPrimitive.createHandle;

export const Popover: typeof PopoverPrimitive.Root = PopoverPrimitive.Root;

export const PopoverPortal: typeof PopoverPrimitive.Portal =
  PopoverPrimitive.Portal;

export function PopoverTrigger({
  className,
  children,
  ...props
}: PopoverPrimitive.Trigger.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Trigger
      className={className}
      data-slot="popover-trigger"
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
}

export type PopoverPopupProps = PopoverPrimitive.Popup.Props &
  VariantProps<typeof popoverPopupVariants> & {
    portalProps?: PopoverPrimitive.Portal.Props;
    side?: PopoverPrimitive.Positioner.Props["side"];
    align?: PopoverPrimitive.Positioner.Props["align"];
    sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
    alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
    anchor?: PopoverPrimitive.Positioner.Props["anchor"];
  };

export function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  anchor,
  portalProps,
  colorScheme,
  ...props
}: PopoverPopupProps): React.ReactElement {
  return (
    <PopoverPortal {...portalProps}>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50 max-w-(--available-width) [transition-duration:350ms] [transition-property:top,left,right,bottom,transform] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] data-instant:transition-none motion-reduce:transition-none"
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(popoverPopupVariants({ colorScheme }), className)}
          data-slot="popover-popup"
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPortal>
  );
}

export function PopoverClose({
  ...props
}: PopoverPrimitive.Close.Props): React.ReactElement {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export function PopoverTitle({
  className,
  ...props
}: PopoverPrimitive.Title.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Title
      className={cn(
        "font-heading font-semibold text-base leading-6 tracking-tight",
        className,
      )}
      data-slot="popover-title"
      {...props}
    />
  );
}

export function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Description
      className={cn("text-muted-foreground text-sm leading-5", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

export function PopoverActions({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "-me-1 mt-2 -mb-1 flex flex-wrap items-center justify-end gap-2",
        className,
      )}
      data-slot="popover-actions"
      {...props}
    />
  );
}

export { PopoverPrimitive, PopoverPopup as PopoverContent };
