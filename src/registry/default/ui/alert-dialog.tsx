"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export {
  DialogFooter as AlertDialogFooter,
  DialogHeader as AlertDialogHeader,
  DialogIcon as AlertDialogIcon,
} from "@/registry/default/ui/dialog";

export const AlertDialogCreateHandle: typeof AlertDialogPrimitive.createHandle =
  AlertDialogPrimitive.createHandle;

export const AlertDialog: typeof AlertDialogPrimitive.Root =
  AlertDialogPrimitive.Root;

export const AlertDialogPortal: typeof AlertDialogPrimitive.Portal =
  AlertDialogPrimitive.Portal;

export function AlertDialogTrigger(
  props: AlertDialogPrimitive.Trigger.Props,
): React.ReactElement {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export function AlertDialogBackdrop({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/32 transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      data-slot="alert-dialog-backdrop"
      {...props}
    />
  );
}

export function AlertDialogViewport({
  className,
  ...props
}: AlertDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 grid grid-rows-1 place-items-center overflow-hidden p-12 max-sm:p-6",
        className,
      )}
      data-slot="alert-dialog-viewport"
      {...props}
    />
  );
}

export interface AlertDialogPopupProps
  extends AlertDialogPrimitive.Popup.Props {
  portalProps?: AlertDialogPrimitive.Portal.Props;
}

export function AlertDialogPopup({
  className,
  portalProps,
  ...props
}: AlertDialogPopupProps): React.ReactElement {
  return (
    <AlertDialogPortal {...portalProps}>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPrimitive.Popup
          className={cn(
            "relative row-start-1 flex max-h-full min-h-0 w-full min-w-70 max-w-lg origin-center flex-col overflow-hidden rounded-3xl bg-popover text-popover-foreground shadow-lg outline-none will-change-transform",
            "-translate-y-[calc(0.75rem*var(--nested-dialogs,0))] scale-[calc(1-0.05*var(--nested-dialogs,0))] opacity-[calc(1-0.15*var(--nested-dialogs,0))]",
            "[transition-duration:350ms,150ms,350ms] [transition-property:scale,opacity,translate] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1),ease-out,linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)]",
            "data-ending-style:scale-85 data-starting-style:scale-85 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-out motion-reduce:transition-none",
            className,
          )}
          data-slot="dialog-popup"
          {...props}
        />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        "font-heading font-semibold text-foreground text-xl leading-7 tracking-tight",
        className,
      )}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-muted-foreground text-sm leading-5", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

export function AlertDialogClose(
  props: AlertDialogPrimitive.Close.Props,
): React.ReactElement {
  return (
    <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
  );
}

export {
  AlertDialogPrimitive,
  AlertDialogBackdrop as AlertDialogOverlay,
  AlertDialogPopup as AlertDialogContent,
};
