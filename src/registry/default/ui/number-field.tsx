"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import type { VariantProps } from "class-variance-authority";
import { MinusIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { inputVariants } from "@/registry/default/ui/input";

const numberFieldActionClasses =
  "h-full! w-10! in-data-[size=lg]:w-12! in-data-[size=sm]:w-9! shrink-0 rounded-none! text-muted-foreground hover:text-foreground focus-visible:ring-inset focus-visible:ring-offset-0 disabled:opacity-38 data-disabled:opacity-38";

export interface NumberFieldContextValue
  extends VariantProps<typeof inputVariants> {
  fieldId: string;
}

export const NumberFieldContext: React.Context<NumberFieldContextValue | null> =
  React.createContext<NumberFieldContextValue | null>(null);

export type NumberFieldProps = NumberFieldPrimitive.Root.Props &
  VariantProps<typeof inputVariants>;

export function NumberField({
  id,
  className,
  variant = "filled",
  shape = "pill",
  size = "default",
  ...props
}: NumberFieldProps): React.ReactElement {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;

  return (
    <NumberFieldContext value={{ fieldId, shape, size, variant }}>
      <NumberFieldPrimitive.Root
        className={cn("flex w-full flex-col items-start gap-1.5", className)}
        data-shape={shape}
        data-size={size}
        data-slot="number-field"
        id={fieldId}
        {...props}
      />
    </NumberFieldContext>
  );
}

export function NumberFieldGroup({
  className,
  variant,
  shape,
  size,
  ...props
}: NumberFieldPrimitive.Group.Props &
  VariantProps<typeof inputVariants>): React.ReactElement {
  const context = React.use(NumberFieldContext);
  const resolvedVariant = variant ?? context?.variant ?? "filled";
  const resolvedShape = shape ?? context?.shape ?? "pill";
  const resolvedSize = size ?? context?.size ?? "default";

  return (
    <NumberFieldPrimitive.Group
      className={cn(
        inputVariants({
          shape: resolvedShape,
          size: resolvedSize,
          variant: resolvedVariant,
        }),
        "gap-0 overflow-hidden px-0! has-[>button:first-child]:ps-0! has-[>button:last-child]:pe-0!",
        className,
      )}
      data-shape={resolvedShape}
      data-size={resolvedSize}
      data-slot="number-field-group"
      {...props}
    />
  );
}

export function NumberFieldDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Decrement
      className={cn(numberFieldActionClasses, className)}
      data-slot="number-field-decrement"
      render={<Button size="icon-xs" variant="ghost" />}
      {...props}
    >
      {children ?? <MinusIcon aria-hidden="true" />}
    </NumberFieldPrimitive.Decrement>
  );
}

export function NumberFieldIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Increment
      className={cn(numberFieldActionClasses, className)}
      data-slot="number-field-increment"
      render={<Button size="icon-xs" variant="ghost" />}
      {...props}
    >
      {children ?? <PlusIcon aria-hidden="true" />}
    </NumberFieldPrimitive.Increment>
  );
}

export function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props): React.ReactElement {
  return (
    <NumberFieldPrimitive.Input
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-2 text-center font-medium text-foreground tabular-nums outline-none selection:bg-primary/20 placeholder:text-muted-foreground/72",
        className,
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

export function NumberFieldScrubArea({
  className,
  label,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props & {
  label: string;
}): React.ReactElement {
  const context = React.use(NumberFieldContext);

  if (!context) {
    throw new Error(
      "NumberFieldScrubArea must be used within a NumberField component for accessibility.",
    );
  }

  return (
    <NumberFieldPrimitive.ScrubArea
      className={cn(
        "flex cursor-ew-resize items-center gap-1.5 px-1 data-disabled:pointer-events-none data-disabled:opacity-38",
        className,
      )}
      data-slot="number-field-scrub-area"
      {...props}
    >
      <label
        className="inline-flex cursor-ew-resize items-center gap-2 font-medium text-foreground text-sm leading-5"
        data-slot="label"
        htmlFor={context.fieldId}
      >
        {label}
      </label>
      <NumberFieldPrimitive.ScrubAreaCursor className="drop-shadow-sm">
        <CursorGrowIcon />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  );
}

export function CursorGrowIcon(
  props: React.ComponentProps<"svg">,
): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-6.5"
      fill="currentColor"
      viewBox="0 0 24 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

export { NumberFieldPrimitive };
