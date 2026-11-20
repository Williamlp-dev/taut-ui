"use client";

import { Toast } from "@base-ui/react/toast";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type React from "react";
import { tautSize } from "@/registry/default/lib/morph";
import { cn } from "@/registry/default/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

const TOAST_ICONS = {
  error: CircleAlertIcon,
  info: InfoIcon,
  loading: Spinner,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
} as const;

type SwipeDirection = "up" | "down" | "left" | "right";

type ToastData = {
  rootProps?: Omit<
    React.ComponentProps<typeof Toast.Root>,
    "children" | "className" | "swipeDirection" | "toast"
  >;
  tooltipStyle?: boolean;
};

function getSwipeDirection(position: ToastPosition): SwipeDirection[] {
  const verticalDirection: SwipeDirection = position.startsWith("top")
    ? "up"
    : "down";

  if (position.includes("center")) {
    return [verticalDirection];
  }

  if (position.includes("left")) {
    return ["left", verticalDirection];
  }

  return ["right", verticalDirection];
}

function Toasts({
  position,
  portalProps,
}: {
  position: ToastPosition;
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}): React.ReactElement {
  const { toasts } = Toast.useToastManager();
  const swipeDirection = getSwipeDirection(position);

  return (
    <Toast.Portal data-slot="toast-portal" {...portalProps}>
      <Toast.Viewport
        className={cn(
          "fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-96 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(6)]",
          "data-[position*=top]:top-(--toast-inset)",
          "data-[position*=bottom]:bottom-(--toast-inset)",
          "data-[position*=left]:left-(--toast-inset)",
          "data-[position*=right]:right-(--toast-inset)",
          "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2",
        )}
        data-position={position}
        data-slot="toast-viewport"
      >
        {toasts.map((toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null;
          const toastData = toast.data as ToastData | undefined;

          return (
            <Toast.Root
              key={toast.id}
              className={cn(
                "absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full select-none rounded-2xl bg-popover text-popover-foreground shadow-[0_0_0_0.0625rem_var(--toast-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)] [--toast-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_22%)] dark:[--toast-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_32%)]",
                "[transition-duration:450ms,350ms,200ms] [transition-property:transform,opacity,height] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1),ease,ease] motion-reduce:transition-none",
                "data-[position*=right]:right-0 data-[position*=right]:left-auto",
                "data-[position*=left]:right-auto data-[position*=left]:left-0",
                "data-[position*=center]:right-0 data-[position*=center]:left-0",
                "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))]",
                "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))]",
                "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+0.0625rem)] after:w-full",
                "data-[position*=top]:after:top-full",
                "data-[position*=bottom]:after:bottom-full",
                "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.07)))] [--toast-shrink:calc(1-var(--toast-scale))]",
                "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
                "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
                "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
                "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
                "data-limited:opacity-0",
                "data-expanded:h-(--toast-height)",
                "data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))] data-position:data-expanded:scale-100",
                "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))_scale(0.92)] data-[position*=top]:data-starting-style:opacity-0",
                "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))_scale(0.92)] data-[position*=bottom]:data-starting-style:opacity-0",
                "data-ending-style:opacity-0",
                "data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))_scale(0.92)]",
                "data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))_scale(0.92)]",
                "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-ending-style:data-[swipe-direction=left]:opacity-0",
                "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-ending-style:data-[swipe-direction=right]:opacity-0",
                "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))] data-ending-style:data-[swipe-direction=up]:opacity-0",
                "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))] data-ending-style:data-[swipe-direction=down]:opacity-0",
                "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:opacity-0",
                "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:opacity-0",
                "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))] data-expanded:data-ending-style:data-[swipe-direction=up]:opacity-0",
                "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))] data-expanded:data-ending-style:data-[swipe-direction=down]:opacity-0",
              )}
              {...toastData?.rootProps}
              data-position={position}
              swipeDirection={swipeDirection}
              toast={toast}
            >
              <Toast.Content className="pointer-events-auto flex items-center justify-between gap-3 overflow-hidden px-4 py-3.5 text-sm transition-opacity duration-250 data-behind:not-data-expanded:pointer-events-none data-behind:opacity-0 data-expanded:opacity-100">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <div
                      className="mt-0.5 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                      data-slot="toast-icon"
                    >
                      <Icon className="size-4.5 in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning" />
                    </div>
                  )}

                  <div className="flex flex-col gap-0.5">
                    <Toast.Title
                      className="font-medium text-foreground text-sm tracking-tight"
                      data-slot="toast-title"
                    />
                    <Toast.Description
                      className="text-muted-foreground text-xs leading-normal"
                      data-slot="toast-description"
                    />
                  </div>
                </div>
                {toast.actionProps && (
                  <Toast.Action
                    className={cn(
                      tautSize({ size: "xs" }),
                      buttonVariants({ variant: "outline" }),
                      "rounded-(--r-full)",
                    )}
                    data-slot="toast-action"
                  >
                    {toast.actionProps.children}
                  </Toast.Action>
                )}
              </Toast.Content>
            </Toast.Root>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

function AnchoredToasts({
  portalProps,
}: {
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}): React.ReactElement {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal data-slot="toast-portal-anchored" {...portalProps}>
      <Toast.Viewport
        className="outline-none"
        data-slot="toast-viewport-anchored"
      >
        {toasts.map((toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null;
          const toastData = toast.data as ToastData | undefined;
          const tooltipStyle = toastData?.tooltipStyle ?? false;
          const positionerProps = toast.positionerProps;

          if (!positionerProps?.anchor) {
            return null;
          }

          return (
            <Toast.Positioner
              key={toast.id}
              className="z-60 max-w-[min(--spacing(64),var(--available-width))]"
              data-slot="toast-positioner"
              sideOffset={positionerProps.sideOffset ?? 4}
              toast={toast}
            >
              <Toast.Root
                className={cn(
                  "relative text-balance bg-popover text-popover-foreground text-xs shadow-[0_0_0_0.0625rem_var(--toast-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)] transition-[scale,opacity] duration-200 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] [--toast-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_22%)] data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none dark:[--toast-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_32%)]",
                  tooltipStyle ? "rounded-xl" : "rounded-2xl",
                )}
                {...toastData?.rootProps}
                data-slot="toast-popup"
                toast={toast}
              >
                {tooltipStyle ? (
                  <Toast.Content className="pointer-events-auto px-2.5 py-1.5">
                    <Toast.Title data-slot="toast-title" />
                  </Toast.Content>
                ) : (
                  <Toast.Content className="pointer-events-auto flex items-center justify-between gap-2.5 overflow-hidden px-3.5 py-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <div
                          className="[&_svg]:pointer-events-none [&_svg]:shrink-0"
                          data-slot="toast-icon"
                        >
                          <Icon className="size-4 in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning" />
                        </div>
                      )}

                      <div className="flex flex-col gap-0.5">
                        <Toast.Title
                          className="font-medium"
                          data-slot="toast-title"
                        />
                        <Toast.Description
                          className="text-muted-foreground"
                          data-slot="toast-description"
                        />
                      </div>
                    </div>
                    {toast.actionProps && (
                      <Toast.Action
                        className={cn(
                          tautSize({ size: "xs" }),
                          buttonVariants({ variant: "outline" }),
                          "rounded-(--r-full)",
                        )}
                        data-slot="toast-action"
                      >
                        {toast.actionProps.children}
                      </Toast.Action>
                    )}
                  </Toast.Content>
                )}
              </Toast.Root>
            </Toast.Positioner>
          );
        })}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export const toastManager: ReturnType<typeof Toast.createToastManager> =
  Toast.createToastManager();

export const anchoredToastManager: ReturnType<typeof Toast.createToastManager> =
  Toast.createToastManager();

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProviderProps extends Toast.Provider.Props {
  position?: ToastPosition;
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}

export function ToastProvider({
  children,
  position = "bottom-right",
  portalProps,
  ...props
}: ToastProviderProps): React.ReactElement {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <Toasts portalProps={portalProps} position={position} />
    </Toast.Provider>
  );
}

export interface AnchoredToastProviderProps extends Toast.Provider.Props {
  portalProps?: React.ComponentProps<typeof Toast.Portal>;
}

export function AnchoredToastProvider({
  children,
  portalProps,
  ...props
}: AnchoredToastProviderProps): React.ReactElement {
  return (
    <Toast.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <AnchoredToasts portalProps={portalProps} />
    </Toast.Provider>
  );
}

export { Toast as ToastPrimitive };
