"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { XIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

export const SheetCreateHandle: typeof SheetPrimitive.createHandle =
  SheetPrimitive.createHandle;

export const Sheet: typeof SheetPrimitive.Root = SheetPrimitive.Root;

export const SheetPortal: typeof SheetPrimitive.Portal = SheetPrimitive.Portal;

export function SheetTrigger(
  props: SheetPrimitive.Trigger.Props,
): React.ReactElement {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose(
  props: SheetPrimitive.Close.Props,
): React.ReactElement {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export function SheetBackdrop({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <SheetPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-xs transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      data-slot="sheet-backdrop"
      {...props}
    />
  );
}

export type SheetSide = "right" | "left" | "top" | "bottom";
export type SheetVariant = "default" | "inset";

export interface SheetViewportProps extends SheetPrimitive.Viewport.Props {
  side?: SheetSide;
  variant?: SheetVariant;
}

export function SheetViewport({
  className,
  side = "right",
  variant = "default",
  ...props
}: SheetViewportProps): React.ReactElement {
  return (
    <SheetPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 overflow-clip",
        side === "bottom" && "flex items-end",
        side === "top" && "flex items-start",
        side === "left" && "flex justify-start",
        side === "right" && "flex justify-end",
        variant === "default" && side === "bottom" && "pt-12",
        variant === "default" && side === "top" && "pb-12",
        variant === "inset" && "p-4",
        className,
      )}
      data-slot="sheet-viewport"
      {...props}
    />
  );
}

export interface SheetPopupProps extends SheetPrimitive.Popup.Props {
  showCloseButton?: boolean;
  side?: SheetSide;
  variant?: SheetVariant;
  closeProps?: SheetPrimitive.Close.Props;
  portalProps?: SheetPrimitive.Portal.Props;
}

export function SheetPopup({
  className,
  children,
  showCloseButton = true,
  side = "right",
  variant = "default",
  closeProps,
  portalProps,
  ...props
}: SheetPopupProps): React.ReactElement {
  return (
    <SheetPortal {...portalProps}>
      <SheetBackdrop />
      <SheetViewport side={side} variant={variant}>
        <SheetPrimitive.Popup
          className={cn(
            "relative flex max-h-full min-h-0 min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg outline-none",
            "[transition-duration:400ms,200ms] [transition-property:translate,opacity] [transition-timing-function:linear(0,0.005_1%,0.024_3%,0.054_4%,0.098_6%,0.201_9%,0.533_19%,0.632_22%,0.718_25%,0.786_28%,0.846_32%,0.895_35%,0.932_38%,0.964_42%,0.987_46%,1.003_50%,1.012_55%,1.015_65%,1),ease-out]",
            "after:pointer-events-none after:absolute after:bg-popover data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-200 data-ending-style:ease-out motion-reduce:transition-none",
            side === "left" &&
              "h-full w-[calc(100%-3rem)] max-w-md after:inset-y-0 after:right-full after:w-12 data-ending-style:-translate-x-[calc(100%+1rem)] data-starting-style:-translate-x-[calc(100%+1rem)]",
            side === "right" &&
              "h-full w-[calc(100%-3rem)] max-w-md after:inset-y-0 after:left-full after:w-12 data-ending-style:translate-x-[calc(100%+1rem)] data-starting-style:translate-x-[calc(100%+1rem)]",
            side === "bottom" &&
              "w-full after:inset-x-0 after:top-full after:h-12 data-ending-style:translate-y-[calc(100%+1rem)] data-starting-style:translate-y-[calc(100%+1rem)]",
            side === "top" &&
              "w-full after:inset-x-0 after:bottom-full after:h-12 data-ending-style:-translate-y-[calc(100%+1rem)] data-starting-style:-translate-y-[calc(100%+1rem)]",
            variant === "default" &&
              side === "left" &&
              "rounded-e-3xl border-border border-e",
            variant === "default" &&
              side === "right" &&
              "rounded-s-3xl border-border border-s",
            variant === "default" &&
              side === "bottom" &&
              "rounded-t-3xl border-border border-t",
            variant === "default" &&
              side === "top" &&
              "rounded-b-3xl border-border border-b",
            variant === "inset" &&
              "rounded-3xl border border-border after:hidden",
            className,
          )}
          data-closable={showCloseButton ? "" : undefined}
          data-side={side}
          data-slot="sheet-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <SheetPrimitive.Close
              aria-label="Close"
              className="absolute end-4 top-4"
              render={<Button size="icon-sm" variant="ghost" />}
              {...closeProps}
            >
              <XIcon aria-hidden="true" />
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Popup>
      </SheetViewport>
    </SheetPortal>
  );
}

export function SheetHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-1.5 px-6 in-data-closable:pe-14 pt-6 in-[[data-slot=sheet-popup]:not(:has([data-slot=sheet-panel],[data-slot=sheet-footer]))]:pb-6 pb-4",
      className,
    ),
    "data-slot": "sheet-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface SheetFooterProps extends useRender.ComponentProps<"div"> {
  variant?: "default" | "bare";
}

export function SheetFooter({
  className,
  variant = "default",
  render,
  ...props
}: SheetFooterProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col-reverse gap-2 px-6 sm:flex-row sm:items-center sm:justify-end",
      variant === "default" &&
        "rounded-b-[inherit] border-border border-t bg-muted/40 py-4",
      variant === "bare" &&
        "in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pt-2 pt-4 pb-6",
      className,
    ),
    "data-slot": "sheet-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props): React.ReactElement {
  return (
    <SheetPrimitive.Title
      className={cn(
        "font-heading font-semibold text-xl leading-7 tracking-tight",
        className,
      )}
      data-slot="sheet-title"
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props): React.ReactElement {
  return (
    <SheetPrimitive.Description
      className={cn("text-muted-foreground text-sm leading-5", className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export interface SheetPanelProps extends useRender.ComponentProps<"div"> {
  scrollFade?: boolean;
}

export function SheetPanel({
  className,
  scrollFade = true,
  render,
  ...props
}: SheetPanelProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "p-6 in-[[data-slot=sheet-popup]:has([data-slot=sheet-header])]:pt-2 in-[[data-slot=sheet-popup]:has([data-slot=sheet-footer]:not(.border-t))]:pb-2",
      className,
    ),
    "data-slot": "sheet-panel",
  };

  return (
    <ScrollArea overscrollContain scrollFade={scrollFade}>
      {useRender({
        defaultTagName: "div",
        props: mergeProps<"div">(defaultProps, props),
        render,
      })}
    </ScrollArea>
  );
}

export {
  SheetPrimitive,
  SheetBackdrop as SheetOverlay,
  SheetPopup as SheetContent,
};
