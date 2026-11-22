"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const textareaVariants = cva(
  [
    "group/textarea relative inline-flex w-full text-foreground outline-none",
    "focus-within:shadow-[inset_0_0_0_0.125rem_var(--color-primary)]",
    "has-[[aria-invalid=true]]:shadow-[inset_0_0_0_0.125rem_var(--color-destructive)]! data-invalid:shadow-[inset_0_0_0_0.125rem_var(--color-destructive)]!",
    "has-autofill:bg-[color-mix(in_oklab,var(--color-background),var(--color-foreground)_8%)]",
    "has-disabled:pointer-events-none has-disabled:opacity-38 data-disabled:pointer-events-none data-disabled:opacity-38",
  ],
  {
    defaultVariants: {
      shape: "rounded",
      variant: "filled",
    },
    variants: {
      shape: {
        pill: "rounded-3xl",
        round: "rounded-3xl",
        rounded: "rounded-2xl",
        square: "rounded-lg",
      },
      variant: {
        filled:
          "bg-[color-mix(in_oklab,var(--color-background),var(--color-foreground)_6%)] shadow-[inset_0_0_0_0.0625rem_var(--color-border)]",
        outline:
          "bg-background shadow-[inset_0_0_0_0.0625rem_var(--color-input)]",
        outlined:
          "bg-background shadow-[inset_0_0_0_0.0625rem_var(--color-input)]",
      },
    },
  },
);

export const textareaFieldVariants = cva(
  [
    "field-sizing-content m-0 w-full min-w-0 rounded-[inherit] border-0 bg-transparent text-foreground outline-none ring-0",
    "placeholder:text-muted-foreground/72 focus:outline-none focus:ring-0 disabled:cursor-not-allowed",
    "[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:var(--foreground)]",
  ],
  {
    defaultVariants: {
      resize: "vertical",
      size: "default",
    },
    variants: {
      resize: {
        both: "resize",
        horizontal: "resize-x",
        none: "resize-none",
        vertical: "resize-y",
      },
      size: {
        default: "min-h-24 px-4 py-3 text-sm",
        lg: "min-h-32 px-5 py-3.5 text-base",
        sm: "min-h-20 px-3 py-2 text-sm",
      },
    },
  },
);

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<"textarea">,
    React.RefAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  size?: VariantProps<typeof textareaFieldVariants>["size"];
  resize?: VariantProps<typeof textareaFieldVariants>["resize"];
  unstyled?: boolean;
}

export function Textarea({
  className,
  variant = "filled",
  shape = "rounded",
  size = "default",
  resize = "vertical",
  unstyled = false,
  ref,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <span
      className={
        cn(!unstyled && textareaVariants({ variant, shape }), className) ||
        undefined
      }
      data-shape={shape}
      data-size={size}
      data-slot="textarea-control"
      data-variant={variant}
    >
      <FieldPrimitive.Control
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        ref={ref}
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className={cn(
              !unstyled && textareaFieldVariants({ resize, size }),
              unstyled &&
                "field-sizing-content m-0 min-h-16 w-full min-w-0 resize-none border-0 bg-transparent text-foreground text-sm leading-relaxed outline-none placeholder:text-muted-foreground/72 focus:outline-none focus:ring-0",
            )}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
        value={props.value}
      />
    </span>
  );
}

export { FieldPrimitive };
