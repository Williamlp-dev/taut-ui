"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

function getValues(
  value: number | readonly number[] | undefined,
  defaultValue: number | readonly number[] | undefined,
  min: number,
): readonly number[] {
  if (value !== undefined) return typeof value === "number" ? [value] : value;
  if (defaultValue !== undefined)
    return typeof defaultValue === "number" ? [defaultValue] : defaultValue;
  return [min];
}

export const sliderVariants = cva(
  [
    "group/slider relative data-[orientation=vertical]:inline-flex data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center",
    "[--sl-bg:var(--color-background)] [--sl-gap:0.1875rem]",
    "in-[[data-slot=card]]:[--sl-bg:var(--color-card)] in-[[data-slot=dialog-popup]]:[--sl-bg:var(--color-popover)] in-[[data-slot=drawer-popup]]:[--sl-bg:var(--color-popover)] in-[[data-slot=popover-popup]]:[--sl-bg:var(--color-popover)] in-[[data-slot=sheet-popup]]:[--sl-bg:var(--color-popover)]",
  ],
  {
    defaultVariants: { size: "default" },
    variants: {
      size: {
        xs: "[--sl-handle:1rem] [--sl-thumb:1rem] [--sl-track:0.25rem]",
        default:
          "[--sl-handle:1.25rem] [--sl-thumb:1.25rem] [--sl-track:0.375rem]",
        sm: "[--sl-handle:1.5rem] [--sl-thumb:0.75rem] [--sl-track:0.625rem]",
        md: "[--sl-handle:1.875rem] [--sl-thumb:0.625rem] [--sl-track:1rem]",
        lg: "[--sl-handle:2.375rem] [--sl-thumb:0.625rem] [--sl-track:1.5rem]",
        xl: "[--sl-handle:3rem] [--sl-thumb:0.75rem] [--sl-track:2rem]",
      },
    },
  },
);

export interface SliderProps
  extends SliderPrimitive.Root.Props,
    VariantProps<typeof sliderVariants> {
  showValueIndicator?: boolean;
  showTicks?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  getThumbAriaLabel?: (index: number) => string;
}

export function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  size,
  orientation = "horizontal",
  showValueIndicator = false,
  showTicks = false,
  startIcon,
  endIcon,
  getThumbAriaLabel,
  ...props
}: SliderProps): React.ReactElement {
  const values = getValues(value, defaultValue, min);
  const vertical = orientation === "vertical";
  const steps = Math.round((max - min) / step);
  const hasTicks = showTicks && steps >= 1 && steps <= 50;

  return (
    <SliderPrimitive.Root
      className={cn(sliderVariants({ size }), className)}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      orientation={orientation}
      step={step}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {children}
      <div
        className={cn(
          "flex items-center",
          vertical ? "h-full flex-col-reverse gap-2" : "w-full gap-2.5",
        )}
      >
        {startIcon && (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center justify-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none"
            data-slot="slider-start-icon"
          >
            {startIcon}
          </span>
        )}
        <SliderPrimitive.Control
          className="flex grow cursor-pointer touch-none select-none items-center data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=horizontal]:min-h-9 data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=vertical]:min-w-9 data-[orientation=vertical]:flex-col data-disabled:opacity-38"
          data-slot="slider-control"
        >
          <SliderPrimitive.Track
            className="relative grow select-none before:absolute before:inset-0 before:rounded-full before:bg-[color-mix(in_oklab,var(--sl-bg),var(--color-foreground)_12%)] data-[orientation=horizontal]:h-(--sl-track) data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-(--sl-track)"
            data-slot="slider-track"
          >
            <SliderPrimitive.Indicator
              className="select-none rounded-full bg-primary"
              data-slot="slider-indicator"
            />
            {hasTicks &&
              Array.from({ length: steps + 1 }, (_, i) => {
                const p = `${(i / steps) * 100}%`;
                return (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -m-0.5 size-1 rounded-full bg-[color-mix(in_oklab,var(--sl-bg),var(--color-foreground)_32%)] data-[orientation=horizontal]:top-1/2 data-[orientation=vertical]:left-1/2"
                    data-orientation={orientation}
                    data-slot="slider-tick"
                    key={String(i)}
                    style={vertical ? { bottom: p } : { insetInlineStart: p }}
                  />
                );
              })}
            {Array.from({ length: values.length }, (_, index) => (
              <SliderPrimitive.Thumb
                className={cn(
                  "group/thumb z-10 block shrink-0 cursor-grab select-none rounded-full bg-(--sl-bg) shadow-[0_0_0_var(--sl-gap)_var(--sl-bg)] outline-none active:cursor-grabbing",
                  vertical
                    ? "h-(--sl-thumb) w-(--sl-handle) [--sl-press:1.06_0.84]"
                    : "h-(--sl-handle) w-(--sl-thumb) [--sl-press:0.84_1.06]",
                  "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-primary",
                  "before:transition-[scale] before:duration-150 before:ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:before:transition-none",
                  "hover:before:scale-105 active:before:duration-75 data-dragging:before:duration-75 active:before:[scale:var(--sl-press)] data-dragging:before:[scale:var(--sl-press)]",
                  "has-focus-visible:before:ring-3 has-focus-visible:before:ring-ring/32",
                )}
                data-slot="slider-thumb"
                getAriaLabel={getThumbAriaLabel}
                index={index}
                key={String(index)}
              >
                {showValueIndicator && (
                  <SliderPrimitive.Value
                    className={cn(
                      "pointer-events-none absolute flex h-7 min-w-8 scale-50 items-center justify-center rounded-full bg-foreground px-2 font-medium text-background text-xs tabular-nums opacity-0 shadow-sm transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
                      vertical
                        ? "top-1/2 left-full ms-2 origin-left -translate-y-1/2"
                        : "bottom-full left-1/2 mb-2 origin-bottom -translate-x-1/2",
                      "group-data-dragging/thumb:scale-100 group-data-dragging/thumb:opacity-100",
                      "group-has-focus-visible/thumb:scale-100 group-has-focus-visible/thumb:opacity-100",
                    )}
                    data-slot="slider-value-indicator"
                  >
                    {(formatted) => formatted[index]}
                  </SliderPrimitive.Value>
                )}
              </SliderPrimitive.Thumb>
            ))}
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
        {endIcon && (
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center justify-center text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none"
            data-slot="slider-end-icon"
          >
            {endIcon}
          </span>
        )}
      </div>
    </SliderPrimitive.Root>
  );
}

export function SliderValue({
  className,
  ...props
}: SliderPrimitive.Value.Props): React.ReactElement {
  return (
    <SliderPrimitive.Value
      className={cn("flex justify-end text-sm", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { SliderPrimitive };
