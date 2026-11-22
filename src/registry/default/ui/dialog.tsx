"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { XIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";

export const DialogCreateHandle: typeof DialogPrimitive.createHandle =
  DialogPrimitive.createHandle;

export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;

export const DialogPortal: typeof DialogPrimitive.Portal =
  DialogPrimitive.Portal;

export function DialogTrigger(
  props: DialogPrimitive.Trigger.Props,
): React.ReactElement {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogClose(
  props: DialogPrimitive.Close.Props,
): React.ReactElement {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/32 transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

export function DialogViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <DialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 grid grid-rows-1 place-items-center overflow-hidden p-12 max-sm:p-6",
        className,
      )}
      data-slot="dialog-viewport"
      {...props}
    />
  );
}

export interface DialogPopupProps extends DialogPrimitive.Popup.Props {
  showCloseButton?: boolean;
  fullscreenOnMobile?: boolean;
  closeProps?: DialogPrimitive.Close.Props;
  portalProps?: DialogPrimitive.Portal.Props;
}

export function DialogPopup({
  className,
  children,
  showCloseButton = false,
  fullscreenOnMobile = false,
  closeProps,
  portalProps,
  ...props
}: DialogPopupProps): React.ReactElement {
  return (
    <DialogPortal {...portalProps}>
      <DialogBackdrop />
      <DialogViewport className={cn(fullscreenOnMobile && "max-sm:p-0")}>
        <DialogPrimitive.Popup
          className={cn(
            "relative row-start-1 flex max-h-full min-h-0 w-full min-w-70 max-w-lg origin-center flex-col overflow-hidden rounded-3xl bg-popover text-popover-foreground shadow-lg outline-none will-change-transform",
            "-translate-y-[calc(0.75rem*var(--nested-dialogs,0))] scale-[calc(1-0.05*var(--nested-dialogs,0))] opacity-[calc(1-0.15*var(--nested-dialogs,0))]",
            "[transition-duration:350ms,150ms,350ms] [transition-property:scale,opacity,translate] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1),ease-out,linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)]",
            "data-ending-style:scale-85 data-starting-style:scale-85 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-out motion-reduce:transition-none",
            fullscreenOnMobile &&
              "max-sm:row-span-full max-sm:h-full max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:shadow-none max-sm:data-ending-style:translate-y-8 max-sm:data-starting-style:translate-y-8 max-sm:data-ending-style:scale-100 max-sm:data-starting-style:scale-100",
            className,
          )}
          data-closable={showCloseButton ? "" : undefined}
          data-slot="dialog-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="absolute end-4 top-4"
              render={<Button size="icon-sm" variant="ghost" />}
              {...closeProps}
            >
              <XIcon aria-hidden="true" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  );
}

export function DialogIcon({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto mb-1 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--color-popover),var(--color-primary)_14%)] text-primary [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      data-slot="dialog-icon"
      {...props}
    />
  );
}

export function DialogHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex shrink-0 flex-col gap-2 px-6 not-has-[[data-slot=dialog-icon]]:in-data-closable:pe-14 pt-6 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-panel],[data-slot=dialog-footer]))]:pb-6 has-[[data-slot=dialog-icon]]:text-center",
      className,
    ),
    "data-slot": "dialog-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DialogFooter({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "mt-auto flex shrink-0 flex-wrap items-center justify-end gap-2 px-6 pt-4 pb-6",
      className,
    ),
    "data-slot": "dialog-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props): React.ReactElement {
  return (
    <DialogPrimitive.Title
      className={cn(
        "font-heading font-semibold text-foreground text-xl leading-7 tracking-tight",
        className,
      )}
      data-slot="dialog-title"
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props): React.ReactElement {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm leading-5", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export function DialogPanel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 py-4 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-header]))]:pt-6 in-[[data-slot=dialog-popup]:not(:has([data-slot=dialog-footer]))]:pb-6 text-muted-foreground text-sm leading-5 [scrollbar-color:transparent_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] focus-within:[scrollbar-color:color-mix(in_oklab,var(--color-popover),var(--color-muted-foreground)_35%)_transparent] hover:[scrollbar-color:color-mix(in_oklab,var(--color-popover),var(--color-muted-foreground)_35%)_transparent]",
      className,
    ),
    "data-slot": "dialog-panel",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export {
  DialogPrimitive,
  DialogBackdrop as DialogOverlay,
  DialogPopup as DialogContent,
};
