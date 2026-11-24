"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export type RadioGroupProps = RadioGroupPrimitive.Props;

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col items-start gap-2.5", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

export type RadioProps = RadioPrimitive.Root.Props;

export function Radio({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(
        "group/radio relative inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none",
        "[--rb-on:var(--color-primary)] [--rb-rest:var(--color-muted-foreground)]",
        "inset-ring-(--rb-rest) inset-ring-2 data-checked:inset-ring-(--rb-on)",
        "not-aria-invalid:not-data-invalid:not-data-disabled:hover:[--rb-rest:var(--color-foreground)] not-aria-invalid:not-data-invalid:not-data-disabled:focus-visible:[--rb-rest:var(--color-foreground)] not-aria-invalid:not-data-invalid:not-data-disabled:active:[--rb-rest:var(--color-foreground)]",
        "aria-invalid:[--rb-on:var(--color-destructive)] aria-invalid:[--rb-rest:var(--color-destructive)] data-invalid:[--rb-on:var(--color-destructive)] data-invalid:[--rb-rest:var(--color-destructive)]",
        "data-disabled:pointer-events-none data-disabled:opacity-38 in-data-[slot=field-label]:data-disabled:opacity-100 in-data-[slot=label]:data-disabled:opacity-100 data-disabled:transition-none data-disabled:before:hidden data-disabled:[--rb-on:var(--color-foreground)] data-disabled:[--rb-rest:var(--color-foreground)]",
        "before:-translate-1/2 before:pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:size-9 before:rounded-full before:bg-foreground before:opacity-0 before:transition-opacity before:duration-150 motion-reduce:before:transition-none",
        "aria-invalid:before:bg-(--rb-on) data-checked:before:bg-(--rb-on) data-invalid:before:bg-(--rb-on)",
        "not-data-disabled:hover:before:opacity-8 not-data-disabled:focus-visible:before:opacity-10 not-data-disabled:active:before:opacity-10",
        "in-[label:active]:not-data-disabled:before:opacity-10 in-[label:hover]:not-data-disabled:before:opacity-8",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "pointer-coarse:after:-translate-1/2 pointer-coarse:after:absolute pointer-coarse:after:top-1/2 pointer-coarse:after:left-1/2 pointer-coarse:after:size-11",
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none size-2.5 scale-0 rounded-full bg-(--rb-on) [transition:scale_150ms_cubic-bezier(0.3,0,0.8,0.15)] group-data-checked/radio:scale-100 motion-reduce:transition-none group-data-checked/radio:[transition:scale_350ms_linear(0,0.5_8%,0.9_20%,1.02_34%,1_60%,1)]"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive, Radio as RadioGroupItem };
