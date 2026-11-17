"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { mergeProps } from "@base-ui/react/merge-props";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRightIcon, XIcon } from "lucide-react";
import type React from "react";
import { createContext, useContext } from "react";
import { Ripple } from "@/registry/default/lib/ripple";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

type DrawerPosition = "right" | "left" | "top" | "bottom";

interface DrawerContextValue {
  position: DrawerPosition;
  className?: string;
}

const DrawerContext: React.Context<DrawerContextValue> =
  createContext<DrawerContextValue>({
    position: "bottom",
  });

const directionMap: Record<
  DrawerPosition,
  DrawerPrimitive.Root.Props["swipeDirection"]
> = {
  bottom: "down",
  left: "left",
  right: "right",
  top: "up",
};

export const DrawerCreateHandle: typeof DrawerPrimitive.createHandle =
  DrawerPrimitive.createHandle;

export function Drawer({
  swipeDirection,
  position = "bottom",
  className,
  ...props
}: DrawerPrimitive.Root.Props & {
  position?: DrawerPosition;
  className?: string;
}): React.ReactElement {
  return (
    <DrawerContext value={{ position, className }}>
      <DrawerPrimitive.Root
        swipeDirection={swipeDirection ?? directionMap[position]}
        {...props}
      />
    </DrawerContext>
  );
}

export const DrawerPortal: typeof DrawerPrimitive.Portal =
  DrawerPrimitive.Portal;

export function DrawerTrigger(
  props: DrawerPrimitive.Trigger.Props,
): React.ReactElement {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerClose(
  props: DrawerPrimitive.Close.Props,
): React.ReactElement {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerSwipeArea({
  className,
  position: positionProp,
  ...props
}: DrawerPrimitive.SwipeArea.Props & {
  position?: DrawerPosition;
}): React.ReactElement {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPrimitive.SwipeArea
      className={cn(
        "fixed z-50 touch-none",
        position === "bottom" && "inset-x-0 bottom-0 h-8",
        position === "top" && "inset-x-0 top-0 h-8",
        position === "left" && "inset-y-0 left-0 w-8",
        position === "right" && "inset-y-0 right-0 w-8",
        className,
      )}
      data-slot="drawer-swipe-area"
      {...props}
    />
  );
}

export function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/32 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute",
        className,
      )}
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

export function DrawerViewport({
  className,
  position: positionProp,
  variant = "default",
  ...props
}: DrawerPrimitive.Viewport.Props & {
  position?: DrawerPosition;
  variant?: "default" | "straight" | "inset";
}): React.ReactElement {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 [--bleed:--spacing(12)] [--inset:0rem]",
        "touch-none",
        position === "bottom" && "grid grid-rows-[1fr_auto] pt-12",
        position === "top" && "grid grid-rows-[auto_1fr] pb-12",
        position === "left" && "flex justify-start",
        position === "right" && "flex justify-end",
        variant === "inset" && "px-(--inset) sm:[--inset:--spacing(4)]",
        variant === "inset" && position !== "bottom" && "pt-(--inset)",
        variant === "inset" && position !== "top" && "pb-(--inset)",
        className,
      )}
      data-slot="drawer-viewport"
      {...props}
    />
  );
}

export function DrawerPopup({
  className,
  children,
  showCloseButton = false,
  position: positionProp,
  variant = "default",
  showBar = false,
  closeProps,
  portalProps,
  ...props
}: DrawerPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  position?: DrawerPosition;
  variant?: "default" | "straight" | "inset";
  showBar?: boolean;
  closeProps?: DrawerPrimitive.Close.Props;
  portalProps?: DrawerPrimitive.Portal.Props;
}): React.ReactElement {
  const { position: contextPosition, className: rootClassName } =
    useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPortal {...portalProps}>
      <DrawerBackdrop />
      <DrawerViewport position={position} variant={variant}>
        <DrawerPrimitive.Popup
          className={cn(
            "relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[transform,box-shadow,height,background-color] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform [--peek:calc(--spacing(6)-0.0625rem)] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--stack-peek-offset:max(0rem,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_0.0625rem_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:bg-popover data-swiping:select-none data-nested-drawer-open:overflow-hidden data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(2%*(var(--nested-drawers)-var(--stack-progress))))] data-ending-style:shadow-transparent data-starting-style:shadow-transparent data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*(var(--nested-drawers)-var(--stack-progress))))] dark:before:shadow-[0_-0.0625rem_--theme(--color-white/6%)]",
            "touch-none",
            position === "bottom" &&
              "transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] data-ending-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0rem)+var(--inset)))] data-starting-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0rem)+var(--inset)))] row-start-2 -mb-[max(0rem,calc(var(--drawer-snap-point-offset,0rem)+clamp(0,1,var(--drawer-snap-point-offset,0rem)/0.0625rem)*var(--drawer-swipe-movement-y,0rem)))] border-t pb-[max(0rem,calc(env(safe-area-inset-bottom,0rem)+var(--drawer-snap-point-offset,0rem)+clamp(0,1,var(--drawer-snap-point-offset,0rem)/0.0625rem)*var(--drawer-swipe-movement-y,0rem)))] not-data-starting-style:not-data-ending-style:transition-[transform,box-shadow,height,background-color,margin,padding] after:inset-x-0 after:top-full after:h-(--bleed) has-data-[slot=drawer-bar]:pt-2 data-ending-style:mb-0 data-starting-style:mb-0 data-ending-style:pb-0 data-starting-style:pb-0",
            position === "top" &&
              "data-starting-style:transform-[translateY(calc(-100%-var(--inset)))] data-ending-style:transform-[translateY(calc(-100%-var(--inset)))] transform-[translateY(var(--drawer-swipe-movement-y))] border-b after:inset-x-0 after:bottom-full after:h-(--bleed) has-data-[slot=drawer-bar]:pb-2",
            position === "left" &&
              "data-starting-style:transform-[translateX(calc(-100%-var(--inset)))] data-ending-style:transform-[translateX(calc(-100%-var(--inset)))] transform-[translateX(var(--drawer-swipe-movement-x))] w-[calc(100%-(--spacing(12)))] max-w-md border-e after:inset-y-0 after:end-full after:w-(--bleed) has-data-[slot=drawer-bar]:pe-2",
            position === "right" &&
              "transform-[translateX(var(--drawer-swipe-movement-x))] data-ending-style:transform-[translateX(calc(100%+var(--inset)))] data-starting-style:transform-[translateX(calc(100%+var(--inset)))] col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-s after:inset-y-0 after:start-full after:w-(--bleed) has-data-[slot=drawer-bar]:ps-2",
            variant !== "straight" &&
              cn(
                position === "bottom" && "rounded-t-3xl",
                position === "top" &&
                  "rounded-b-3xl **:data-[slot=drawer-footer]:rounded-b-3xl",
                position === "left" &&
                  "rounded-e-3xl **:data-[slot=drawer-footer]:rounded-ee-3xl",
                position === "right" &&
                  "rounded-s-3xl **:data-[slot=drawer-footer]:rounded-es-3xl",
              ),
            variant === "default" &&
              cn(
                position === "bottom" && "before:rounded-t-3xl",
                position === "top" && "before:rounded-b-3xl",
                position === "left" && "before:rounded-e-3xl",
                position === "right" && "before:rounded-s-3xl",
              ),
            variant === "inset" &&
              "before:hidden sm:rounded-3xl sm:border sm:after:bg-transparent sm:before:rounded-3xl sm:**:data-[slot=drawer-footer]:rounded-b-3xl",
            variant === "straight" && "[--stack-step:0]",
            (position === "bottom" || position === "top") &&
              "h-(--drawer-height,auto) [--height:max(0rem,calc(var(--drawer-frontmost-height,var(--drawer-height))))] data-nested-drawer-open:h-(--height)",
            position === "bottom" &&
              "data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))] origin-[50%_calc(100%-var(--inset))]",
            position === "top" &&
              "data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))] origin-[50%_var(--inset)]",
            position === "left" &&
              "data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)))_scale(var(--scale))] origin-right",
            position === "right" &&
              "data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)))_scale(var(--scale))] origin-left",
            rootClassName,
            className,
          )}
          data-slot="drawer-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <DrawerPrimitive.Close
              aria-label="Close"
              className="absolute end-4 top-4 z-10"
              render={<Button size="icon-sm" variant="ghost" />}
              {...closeProps}
            >
              <XIcon />
            </DrawerPrimitive.Close>
          )}
          {showBar && <DrawerBar />}
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

export function DrawerHeader({
  className,
  allowSelection = false,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  allowSelection?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-1.5 px-6 pt-6 in-[[data-slot=drawer-popup]:not(:has([data-slot=drawer-panel],[data-slot=drawer-footer]))]:pb-6 pb-4",
      !allowSelection && "cursor-default",
      className,
    ),
    "data-slot": "drawer-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });
}

export function DrawerFooter({
  className,
  variant = "default",
  allowSelection = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
  allowSelection?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "mt-auto flex flex-col-reverse gap-2 px-6 pb-(--safe-area-inset-bottom,0rem) sm:flex-row sm:justify-end",
      !allowSelection && "cursor-default",
      variant === "default" &&
        "border-t bg-muted/72 pt-4 pb-[calc(env(safe-area-inset-bottom,0rem)+--spacing(4))]",
      variant === "bare" &&
        "in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-2 pt-4 pb-[calc(env(safe-area-inset-bottom,0rem)+--spacing(6))]",
      className,
    ),
    "data-slot": "drawer-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });
}

export function DrawerTitle({
  className,
  ...props
}: DrawerPrimitive.Title.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Title
      className={cn(
        "font-heading font-semibold text-foreground text-xl leading-7 tracking-tight",
        className,
      )}
      data-slot="drawer-title"
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props): React.ReactElement {
  return (
    <DrawerPrimitive.Description
      className={cn("text-muted-foreground text-sm leading-5", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

export function DrawerPanel({
  className,
  scrollFade = false,
  scrollable = true,
  allowSelection = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
  scrollable?: boolean;
  allowSelection?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-2 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-2",
      !allowSelection && "cursor-default",
      className,
    ),
    "data-slot": "drawer-panel",
  };

  const content = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  });

  if (scrollable) {
    return (
      <ScrollArea
        className="touch-auto"
        overscrollContain
        scrollFade={scrollFade}
      >
        {content}
      </ScrollArea>
    );
  }

  return content;
}

export function DrawerBar({
  className,
  position: positionProp,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  position?: DrawerPosition;
}): React.ReactElement {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  const horizontal = position === "left" || position === "right";
  const defaultProps = {
    "aria-hidden": true as const,
    className: cn(
      "absolute flex touch-none items-center justify-center p-3 before:rounded-full before:bg-muted-foreground/30",
      horizontal
        ? "inset-y-0 before:h-12 before:w-1"
        : "inset-x-0 before:h-1.5 before:w-12",
      position === "top" && "bottom-0",
      position === "bottom" && "top-0",
      position === "left" && "right-0",
      position === "right" && "left-0",
      className,
    ),
    "data-slot": "drawer-bar",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export const DrawerContent: typeof DrawerPrimitive.Content =
  DrawerPrimitive.Content;

export function DrawerMenu({
  className,
  render,
  ...props
}: useRender.ComponentProps<"nav">): React.ReactElement {
  const defaultProps = {
    className: cn("-m-2 flex flex-col", className),
    "data-slot": "drawer-menu",
  };

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  });
}

export function DrawerMenuItem({
  className,
  variant = "default",
  render,
  disabled,
  ...props
}: useRender.ComponentProps<"button"> & {
  variant?: "default" | "destructive";
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative flex min-h-9 pointer-coarse:min-h-10 w-full cursor-default select-none items-center gap-2.5 overflow-hidden rounded-lg px-3 py-1.5 font-medium text-foreground text-sm leading-5 outline-none transition-[border-radius,background-color,color] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] hover:rounded-xl hover:bg-accent hover:text-accent-foreground active:rounded-xl disabled:pointer-events-none disabled:opacity-38 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/12 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
      className,
    ),
    "data-slot": "drawer-menu-item",
    "data-variant": variant,
    disabled,
    type: "button" as const,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export function DrawerMenuSeparator({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("mx-2.5 my-1 h-px bg-border", className),
    "data-slot": "drawer-menu-separator",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DrawerMenuGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("flex flex-col gap-0.5", className),
    "data-slot": "drawer-menu-group",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DrawerMenuGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "px-3 py-1.5 font-medium text-muted-foreground text-xs leading-4",
      className,
    ),
    "data-slot": "drawer-menu-group-label",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DrawerMenuTrigger({
  className,
  children,
  ...props
}: DrawerPrimitive.Trigger.Props): React.ReactElement {
  return (
    <DrawerTrigger
      className={cn(
        "relative flex min-h-9 pointer-coarse:min-h-10 w-full cursor-default select-none items-center gap-2.5 overflow-hidden rounded-lg px-3 py-1.5 font-medium text-foreground text-sm leading-5 outline-none transition-[border-radius,background-color,color] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] hover:rounded-xl hover:bg-accent hover:text-accent-foreground active:rounded-xl data-popup-open:rounded-xl motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-slot="drawer-menu-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto size-4 opacity-60" />
      <Ripple hoverOpacity={0} />
    </DrawerTrigger>
  );
}

export function DrawerMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  variant = "default",
  disabled,
  render,
  ...props
}: CheckboxPrimitive.Root.Props & {
  variant?: "default" | "switch";
  render?: React.ReactElement;
}): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      className={cn(
        "relative grid min-h-9 pointer-coarse:min-h-10 w-full cursor-default select-none items-center gap-2.5 overflow-hidden rounded-lg px-3 py-1.5 font-medium text-foreground text-sm leading-5 outline-none transition-[border-radius,background-color,color] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] hover:rounded-xl hover:bg-accent hover:text-accent-foreground active:rounded-xl data-disabled:pointer-events-none data-checked:rounded-xl data-disabled:opacity-38 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        variant === "switch"
          ? "grid-cols-[minmax(0,1fr)_auto] pe-2"
          : "grid-cols-[1rem_minmax(0,1fr)] pe-3",
        className,
      )}
      data-slot="drawer-menu-checkbox-item"
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      render={render}
      {...props}
    >
      {variant === "switch" ? (
        <>
          <span className="wrap-anywhere col-start-1 min-w-0">{children}</span>
          <CheckboxPrimitive.Indicator
            className="inset-shadow-[0_0.0625rem_--theme(--color-black/4%)] col-start-2 inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring data-checked:bg-primary data-unchecked:bg-input"
            keepMounted
          >
            <span className="pointer-events-none block size-4 in-[[data-slot=drawer-menu-checkbox-item][data-checked]]:translate-x-4 rounded-full bg-background shadow-xs transition-transform duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)]" />
          </CheckboxPrimitive.Indicator>
        </>
      ) : (
        <>
          <CheckboxPrimitive.Indicator className="col-start-1 flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
            </svg>
          </CheckboxPrimitive.Indicator>
          <span className="wrap-anywhere col-start-2 min-w-0">{children}</span>
        </>
      )}
      <Ripple hoverOpacity={0} />
    </CheckboxPrimitive.Root>
  );
}

export function DrawerMenuRadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col gap-0.5", className)}
      data-slot="drawer-menu-radio-group"
      {...props}
    />
  );
}

export function DrawerMenuRadioItem({
  className,
  children,
  value,
  disabled,
  render,
  ...props
}: RadioPrimitive.Root.Props & {
  value: string;
  render?: React.ReactElement;
}): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(
        "relative grid min-h-9 pointer-coarse:min-h-10 w-full cursor-default select-none grid-cols-[1rem_minmax(0,1fr)] items-center gap-2.5 overflow-hidden rounded-lg py-1.5 ps-3 pe-3 font-medium text-foreground text-sm leading-5 outline-none transition-[border-radius,background-color,color] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] hover:rounded-xl hover:bg-accent hover:text-accent-foreground active:rounded-xl data-disabled:pointer-events-none data-checked:rounded-xl data-disabled:opacity-38 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-slot="drawer-menu-radio-item"
      disabled={disabled}
      render={render}
      value={value}
      {...props}
    >
      <RadioPrimitive.Indicator className="col-start-1 flex items-center justify-center">
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      </RadioPrimitive.Indicator>
      <span className="wrap-anywhere col-start-2 min-w-0">{children}</span>
      <Ripple hoverOpacity={0} />
    </RadioPrimitive.Root>
  );
}

export { DrawerPrimitive };
