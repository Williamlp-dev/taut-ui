"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export function Field({
  className,
  ...props
}: FieldPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldPrimitive.Root
      className={cn(
        "group/field flex w-full flex-col items-start gap-1.5 has-[>[data-slot=field-label]>[data-slot=checkbox]]:gap-1",
        className,
      )}
      data-slot="field"
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props): React.ReactElement {
  return (
    <FieldPrimitive.Label
      className={cn(
        "inline-flex select-none items-center gap-2.5 font-medium text-foreground text-sm leading-5 has-data-[slot=checkbox]:cursor-pointer has-data-[slot=radio]:cursor-pointer has-data-[slot=switch]:cursor-pointer has-[+[data-shape=pill]]:px-1 data-disabled:pointer-events-none data-disabled:opacity-38 group-data-invalid/field:text-destructive",
        className,
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

export function FieldItem({
  className,
  ...props
}: FieldPrimitive.Item.Props): React.ReactElement {
  return (
    <FieldPrimitive.Item
      className={cn("flex items-center gap-2.5", className)}
      data-slot="field-item"
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props): React.ReactElement {
  return (
    <FieldPrimitive.Description
      className={cn(
        "in-[[data-slot=field]:has(>[data-slot=field-label]>[data-slot=checkbox])]:px-0 px-1 in-[[data-slot=field]:has(>[data-slot=field-label]>[data-slot=checkbox])]:ps-7 text-muted-foreground text-xs leading-4 group-has-data-[slot=field-error]/field:hidden data-disabled:opacity-38 group-data-disabled/field:opacity-38 [&>a:hover]:underline [&>a]:text-primary [&>a]:underline-offset-4",
        className,
      )}
      data-slot="field-description"
      {...props}
    />
  );
}

export function FieldError({
  className,
  ...props
}: FieldPrimitive.Error.Props): React.ReactElement {
  return (
    <FieldPrimitive.Error
      className={cn(
        "starting:-translate-y-1 in-[[data-slot=field]:has(>[data-slot=field-label]>[data-slot=checkbox])]:px-0 px-1 in-[[data-slot=field]:has(>[data-slot=field-label]>[data-slot=checkbox])]:ps-7 text-destructive text-xs leading-4 starting:opacity-0 [transition-duration:350ms,150ms] [transition-property:translate,opacity] [transition-timing-function:linear(0,0.5_8%,0.9_20%,1.02_34%,1_60%,1),ease] motion-reduce:transition-none",
        className,
      )}
      data-slot="field-error"
      {...props}
    />
  );
}

export const FieldControl: typeof FieldPrimitive.Control =
  FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity =
  FieldPrimitive.Validity;

export { FieldPrimitive };
