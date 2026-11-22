"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export type CheckboxGroupProps = CheckboxGroupPrimitive.Props;

export function CheckboxGroup({
  className,
  ...props
}: CheckboxGroupPrimitive.Props): React.ReactElement {
  return (
    <CheckboxGroupPrimitive
      className={cn(
        "relative flex flex-col items-start gap-2.5",
        "[&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])]:font-medium",
        "[&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:relative [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:ms-6",
        "[&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:last-child]:before:rounded-bl-sm [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:pointer-events-none [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:absolute [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:-start-3.5 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:-top-3 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:h-5.5 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:w-2.5 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:border-border [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:border-s [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*]:before:border-b",
        "[&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:pointer-events-none [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:absolute [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:-start-3.5 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:top-2.5 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:bottom-0 [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:w-px [&>:is(label,[data-slot=label],[data-slot=field-label]):has([data-parent])~*:not(:last-child)]:after:bg-border",
        className,
      )}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

export { CheckboxGroupPrimitive };
