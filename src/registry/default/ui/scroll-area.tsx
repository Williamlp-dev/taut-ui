"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export type ScrollAreaProps = ScrollAreaPrimitive.Root.Props & {
  scrollFade?: boolean;
  scrollbarGutter?: boolean;
  fill?: boolean;
  clampContentMinWidth?: boolean;
  overscrollContain?: boolean;
};

export function ScrollArea({
  className,
  children,
  scrollFade = false,
  scrollbarGutter = false,
  fill = false,
  clampContentMinWidth = true,
  overscrollContain = false,
  ...props
}: ScrollAreaProps): React.ReactElement {
  return (
    <ScrollAreaPrimitive.Root
      className={cn(
        "flex size-full min-h-0 flex-col [--fade-size:1.5rem]",
        className,
      )}
      data-slot="scroll-area"
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "h-full min-h-0 w-full flex-1 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          overscrollContain &&
            "data-has-overflow-y:overscroll-y-contain data-has-overflow-x:overscroll-x-contain",
          scrollFade &&
            "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start,0rem)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end,0rem)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end,0rem)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start,0rem)))]",
          scrollbarGutter &&
            "data-has-overflow-y:pe-3 data-has-overflow-x:pb-3",
        )}
        data-slot="scroll-area-viewport"
      >
        <ScrollAreaPrimitive.Content
          className={fill ? "size-full" : undefined}
          data-slot="scroll-area-content"
          style={clampContentMinWidth ? { minWidth: 0 } : undefined}
        >
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

export type ScrollBarProps = ScrollAreaPrimitive.Scrollbar.Props;

export function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps): React.ReactElement {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "m-1 flex opacity-0 transition-opacity delay-300 duration-150 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 motion-reduce:transition-none",
        className,
      )}
      data-base-ui-swipe-ignore=""
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative flex-1 rounded-full bg-foreground/35 transition-colors duration-150 hover:bg-foreground/60 active:bg-primary motion-reduce:transition-none"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollAreaPrimitive };
