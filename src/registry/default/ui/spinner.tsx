import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

const styles = `
@property --taut {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
@keyframes taut-pull {
  50% { --taut: 80deg; rotate: 130deg; }
  to { rotate: 360deg; }
}
`;

export const spinnerVariants = cva(
  "inline-block shrink-0 animate-[spin_5s_linear_infinite] rounded-full align-middle",
  {
    compoundVariants: [
      {
        class: "size-6 p-1",
        size: "xs",
        variant: "contained",
      },
      {
        class: "size-8 p-1.5",
        size: "sm",
        variant: "contained",
      },
      {
        class: "size-10 p-2",
        size: undefined,
        variant: "contained",
      },
      {
        class: "size-10 p-2",
        size: "default",
        variant: "contained",
      },
      {
        class: "size-12 p-2.5",
        size: "lg",
        variant: "contained",
      },
      {
        class: "size-16 p-3.5",
        size: "xl",
        variant: "contained",
      },
    ],
    defaultVariants: {
      variant: "default",
    },
    variants: {
      size: {
        default: "size-5",
        lg: "size-6",
        sm: "size-4",
        xl: "size-8",
        xs: "size-3.5",
      },
      variant: {
        contained: "bg-secondary text-secondary-foreground",
        default: "text-current",
      },
    },
  },
);

export interface SpinnerProps
  extends Omit<React.ComponentProps<"svg">, "children">,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({
  className,
  size,
  variant = "default",
  "aria-label": ariaLabel = "Loading",
  ...props
}: SpinnerProps): React.ReactElement {
  return (
    <>
      <style href="taut-spinner" precedence="default">
        {styles}
      </style>
      <svg
        aria-label={ariaLabel}
        className={cn(spinnerVariants({ size, variant }), className)}
        data-size={size ?? "default"}
        data-slot="spinner"
        data-variant={variant}
        fill="none"
        height={20}
        role="status"
        viewBox="0 0 100 100"
        width={20}
        {...props}
      >
        <circle
          className="opacity-20"
          cx="50"
          cy="50"
          r="44"
          stroke="currentColor"
          strokeWidth="12"
        />
        <rect
          className="origin-center animate-[taut-pull_1.5s_cubic-bezier(0.65,0,0.35,1)_infinite] fill-current forced-color-adjust-none [width:calc(88%*sin(var(--taut))+12%)] [x:calc(44%*(1-sin(var(--taut))))] [y:calc(44%*(1-cos(var(--taut))))] motion-reduce:animate-none motion-reduce:[--taut:60deg]"
          height="12"
          rx="6"
        />
      </svg>
    </>
  );
}
