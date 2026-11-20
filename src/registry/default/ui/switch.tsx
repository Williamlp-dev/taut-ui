"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

const ease = "ease-[cubic-bezier(0.2,0,0,1)]";

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  icons?: "checked" | "both";
  size?: "sm" | "default" | "lg";
}

export function Switch({
  className,
  icons,
  size = "default",
  ...props
}: SwitchProps): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group/switch relative isolate inline-flex h-(--h) w-[calc(var(--h)*1.625)] shrink-0 cursor-pointer items-center rounded-full bg-[color-mix(in_oklab,var(--color-background),var(--color-foreground)_8%)] outline-none",
        "before:absolute before:inset-0 before:rounded-full before:bg-primary before:opacity-0 before:transition-opacity before:duration-200 data-checked:before:opacity-100 motion-reduce:before:transition-none",
        "inset-ring-2 inset-ring-[color-mix(in_oklab,var(--color-background),var(--color-muted-foreground)_60%)] data-checked:inset-ring-transparent",
        "pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:-inset-y-2",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-disabled:cursor-not-allowed data-disabled:opacity-38",
        size === "sm" && "[--h:--spacing(6)]",
        size === "default" && "[--h:--spacing(8)]",
        size === "lg" && "[--h:--spacing(10)]",
        ease,
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "group/thumb pointer-events-none relative grid aspect-square h-full place-items-center rounded-full",
          "[transition:translate_280ms_cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none",
          "data-checked:translate-x-[calc(var(--h)*0.625)]",
          "[--disc:0.5] data-checked:[--disc:0.75]",
          icons === "both" && "data-unchecked:[--disc:0.75]",
          "group-active/switch:not-group-data-disabled/switch:[--disc-active:0.875]",
          "in-[[data-slot=label]:active,[data-slot=field-label]:active]:not-data-disabled:[--disc-active:0.875]",
          "before:absolute before:-inset-[12.5%] before:rounded-full before:bg-foreground before:opacity-0 before:transition-opacity before:duration-150",
          "group-hover/switch:before:opacity-8 group-focus-visible/switch:before:opacity-10",
          "group-active/switch:not-group-data-disabled/switch:before:opacity-12",
          "data-checked:before:bg-primary group-data-disabled/switch:before:hidden",
        )}
        data-slot="switch-thumb"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full bg-muted-foreground",
            "scale-(--disc-active,var(--disc))",
            "transition-[scale] duration-280 motion-reduce:transition-none",
            "group-data-checked/thumb:bg-primary-foreground",
            "group-active/switch:not-group-data-disabled/switch:duration-150",
            ease,
          )}
        />

        {icons && (
          <span className="relative z-10 grid size-1/2 place-items-center">
            <svg
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 size-full fill-primary opacity-0 transition-[opacity,rotate] duration-200 group-data-checked/thumb:opacity-100 motion-reduce:transition-none",
                icons === "checked" &&
                  "-rotate-45 group-data-checked/thumb:rotate-0",
                ease,
              )}
              viewBox="0 0 24 24"
            >
              <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
            </svg>
            {icons === "both" && (
              <svg
                aria-hidden="true"
                className="col-start-1 row-start-1 size-full fill-background transition-opacity duration-150 group-data-checked/thumb:opacity-0 motion-reduce:transition-none"
                viewBox="0 0 24 24"
              >
                <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
              </svg>
            )}
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
