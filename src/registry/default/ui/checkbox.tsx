"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "group/checkbox relative isolate inline-flex size-4.5 shrink-0 cursor-pointer items-center justify-center rounded-xs text-primary-foreground outline-none",
        "inset-ring-(--cb-rest) inset-ring-2 [--cb-on:var(--color-primary)] [--cb-rest:var(--color-muted-foreground)]",
        "not-aria-invalid:not-data-invalid:hover:[--cb-rest:var(--color-foreground)] not-aria-invalid:not-data-invalid:focus-visible:[--cb-rest:var(--color-foreground)] not-aria-invalid:not-data-invalid:active:[--cb-rest:var(--color-foreground)]",
        "aria-invalid:[--cb-on:var(--color-destructive)] aria-invalid:[--cb-rest:var(--color-destructive)] data-invalid:[--cb-on:var(--color-destructive)] data-invalid:[--cb-rest:var(--color-destructive)]",
        "data-disabled:pointer-events-none data-disabled:text-background data-disabled:opacity-38 data-disabled:[--cb-on:var(--color-foreground)] data-disabled:[--cb-rest:var(--color-foreground)]",
        "before:-translate-1/2 before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:z-10 before:size-9 before:rounded-full before:bg-foreground before:opacity-0 before:transition-opacity before:duration-150 motion-reduce:before:transition-none",
        "aria-invalid:before:bg-(--cb-on) data-[indeterminate]:before:bg-(--cb-on) data-checked:before:bg-(--cb-on) data-invalid:before:bg-(--cb-on)",
        "hover:before:opacity-8 focus-visible:before:opacity-10 active:before:opacity-10",
        "in-[label:active]:not-data-disabled:before:opacity-10 in-[label:hover]:not-data-disabled:before:opacity-8",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "pointer-coarse:after:-translate-1/2 pointer-coarse:after:absolute pointer-coarse:after:top-1/2 pointer-coarse:after:left-1/2 pointer-coarse:after:size-11",
        className,
      )}
      data-parent={props.parent ? "" : undefined}
      data-slot="checkbox"
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 scale-60 rounded-[inherit] bg-(--cb-on) opacity-0",
          "[--t:150ms_cubic-bezier(0.3,0,0.8,0.15)] [transition:scale_var(--t),opacity_50ms_linear] motion-reduce:transition-none",
          "group-[:is([data-checked],[data-indeterminate])]/checkbox:scale-100 group-[:is([data-checked],[data-indeterminate])]/checkbox:opacity-100 group-[:is([data-checked],[data-indeterminate])]/checkbox:[--t:350ms_cubic-bezier(0.05,0.7,0.1,1)]",
        )}
      />
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none relative z-20 size-4.5 scale-60 fill-current opacity-0",
          "[--t:150ms_cubic-bezier(0.3,0,0.8,0.15)] [transition:scale_var(--t),opacity_50ms_linear] motion-reduce:transition-none",
          "group-[:is([data-checked],[data-indeterminate])]/checkbox:scale-100 group-[:is([data-checked],[data-indeterminate])]/checkbox:opacity-100 group-[:is([data-checked],[data-indeterminate])]/checkbox:[--t:350ms_cubic-bezier(0.05,0.7,0.1,1)]",
        )}
        viewBox="0 0 18 18"
      >
        <rect
          className={cn(
            "h-0 w-0.5 [transform:scaleY(-1)_translate(0.4375rem,-0.875rem)_rotate(45deg)] [transition:transform_var(--t),height_var(--t)] motion-reduce:transition-none",
            "group-data-[checked]/checkbox:h-[0.3535rem]",
            "group-data-[indeterminate]/checkbox:h-0.5 group-data-[indeterminate]/checkbox:[transform:scaleY(-1)_translate(0.25rem,-0.625rem)_rotate(0deg)]",
          )}
        />
        <rect
          className={cn(
            "h-0.5 w-0 [transform:scaleY(-1)_translate(0.4375rem,-0.875rem)_rotate(45deg)] [transition:transform_var(--t),width_var(--t)] motion-reduce:transition-none",
            "group-data-[checked]/checkbox:w-[0.7071rem]",
            "group-data-[indeterminate]/checkbox:w-2.5 group-data-[indeterminate]/checkbox:[transform:scaleY(-1)_translate(0.25rem,-0.625rem)_rotate(0deg)]",
          )}
        />
      </svg>
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxPrimitive };
