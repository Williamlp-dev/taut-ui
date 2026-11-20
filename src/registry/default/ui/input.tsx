"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export const inputVariants = cva(
  [
    "group/input relative inline-flex w-full min-w-0 items-center text-foreground outline-none",
    "focus-within:shadow-[inset_0_0_0_0.125rem_var(--color-primary)]",
    "has-[[aria-invalid=true]]:shadow-[inset_0_0_0_0.125rem_var(--color-destructive)]! data-invalid:shadow-[inset_0_0_0_0.125rem_var(--color-destructive)]!",
    "has-autofill:bg-[color-mix(in_oklab,var(--color-background),var(--color-foreground)_8%)]",
    "has-disabled:pointer-events-none has-disabled:opacity-38 data-disabled:pointer-events-none data-disabled:opacity-38",
    "[&_svg]:shrink-0 [&_svg]:transition-none",
    "[&_button]:transition-none",
    "[&_[data-slot=ripple-hover]]:transition-none!",
    "[&_svg:not(button_*)]:text-muted-foreground focus-within:[&_svg:not(button_*)]:text-primary",
    "has-[[aria-invalid=true]]:[&_svg:not(button_*)]:text-destructive! data-invalid:[&_svg:not(button_*)]:text-destructive!",
    "[&_button[data-variant=ghost]:hover]:text-foreground [&_button[data-variant=ghost]:hover_svg]:text-foreground [&_button[data-variant=ghost]]:text-muted-foreground focus-within:[&_button[data-variant=ghost]]:text-primary",
    "[&:not(:has([data-align=block-start],[data-align=block-end]))_button]:h-[calc(100%-0.5rem)]",
    "[&:not(:has([data-align=block-start],[data-align=block-end]))_button[data-size^=icon]]:aspect-square [&:not(:has([data-align=block-start],[data-align=block-end]))_button[data-size^=icon]]:w-auto",
    "[&:not(:has([data-align=block-start],[data-align=block-end]))_[data-slot=badge]:not([data-size=dot])]:h-[calc(100%-0.5rem)] [&:not(:has([data-align=block-start],[data-align=block-end]))_[data-slot=badge]:not([data-size=dot])]:px-3",
    "data-[shape=rounded]:[&_button]:[--r-full:0.5rem] data-[shape=square]:[&_button]:[--r-full:0.375rem]",
    "data-[shape=rounded]:[&_[data-slot=badge]]:rounded-lg data-[shape=square]:[&_[data-slot=badge]]:rounded-md",
  ],
  {
    defaultVariants: {
      shape: "pill",
      size: "default",
      variant: "filled",
    },
    variants: {
      shape: {
        pill: "rounded-full",
        round: "rounded-full",
        rounded: "rounded-xl",
        square: "rounded-lg",
      },
      size: {
        default:
          "h-10 gap-2.5 px-4 text-sm has-[>[data-slot=badge]:first-child]:ps-1 has-[>button:first-child]:ps-1 has-[>[data-slot=badge]:last-child]:pe-1 has-[>button:last-child]:pe-1 [&_svg:not([class*='size-'])]:size-4.5",
        lg: "h-12 gap-3 px-5 text-base has-[>[data-slot=badge]:first-child]:ps-1 has-[>button:first-child]:ps-1 has-[>[data-slot=badge]:last-child]:pe-1 has-[>button:last-child]:pe-1 [&_svg:not([class*='size-'])]:size-5",
        md: "h-10 gap-2.5 px-4 text-sm has-[>[data-slot=badge]:first-child]:ps-1 has-[>button:first-child]:ps-1 has-[>[data-slot=badge]:last-child]:pe-1 has-[>button:last-child]:pe-1 [&_svg:not([class*='size-'])]:size-4.5",
        sm: "h-9 gap-2 px-3 text-sm has-[>[data-slot=badge]:first-child]:ps-1 has-[>button:first-child]:ps-1 has-[>[data-slot=badge]:last-child]:pe-1 has-[>button:last-child]:pe-1 [&_svg:not([class*='size-'])]:size-4",
      },
      variant: {
        filled:
          "bg-[color-mix(in_oklab,var(--color-background),var(--color-foreground)_6%)]",
        outline:
          "bg-background shadow-[inset_0_0_0_0.0625rem_var(--color-input)]",
        outlined:
          "bg-background shadow-[inset_0_0_0_0.0625rem_var(--color-input)]",
      },
    },
  },
);

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof inputVariants> & {
    size?: VariantProps<typeof inputVariants>["size"] | number;
    startAddon?: React.ReactNode;
    unstyled?: boolean;
    nativeInput?: boolean;
    children?: React.ReactNode;
  };

export function Input({
  className,
  variant = "filled",
  shape = "pill",
  size = "default",
  startAddon,
  unstyled = false,
  nativeInput = false,
  style,
  children,
  ...props
}: InputProps): React.ReactElement {
  const variantSize = typeof size === "number" ? "default" : size;
  const htmlSize = typeof size === "number" ? size : undefined;
  const inputClassName = cn(
    "m-0 h-full w-full min-w-0 flex-1 border-0 bg-transparent p-0 text-foreground outline-none ring-0",
    "placeholder:text-muted-foreground/72 focus:outline-none focus:ring-0 disabled:cursor-not-allowed",
    "[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:var(--foreground)]",
    props.type === "search" &&
      "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
    props.type === "file" &&
      "h-auto cursor-pointer text-muted-foreground file:me-3 file:cursor-pointer file:border-0 file:bg-transparent file:p-0 file:font-medium file:text-foreground file:text-sm",
  );

  return (
    <span
      className={
        cn(
          !unstyled && inputVariants({ shape, size: variantSize, variant }),
          className,
        ) || undefined
      }
      data-shape={shape}
      data-size={variantSize}
      data-slot="input-control"
      data-variant={variant}
    >
      {startAddon && (
        <span
          aria-hidden="true"
          className="pointer-events-none flex shrink-0 items-center justify-center"
          data-slot="input-start-addon"
        >
          {startAddon}
        </span>
      )}
      {nativeInput ? (
        <input
          className={inputClassName}
          data-slot="input"
          size={htmlSize}
          style={typeof style === "function" ? undefined : style}
          {...props}
        />
      ) : (
        <InputPrimitive
          className={inputClassName}
          data-slot="input"
          size={htmlSize}
          style={style}
          {...props}
        />
      )}
      {children}
    </span>
  );
}

export { InputPrimitive };
