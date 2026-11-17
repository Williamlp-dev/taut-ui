"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const separatorVariants = cva(
  "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[calc(100%-var(--inset,0rem))] data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
  {
    variants: {
      inset: {
        both: "[--inset:2rem] data-[orientation=horizontal]:mx-4 data-[orientation=vertical]:my-4",
        end: "[--inset:1rem] data-[orientation=horizontal]:me-4 data-[orientation=vertical]:mb-4",
        start:
          "[--inset:1rem] data-[orientation=horizontal]:ms-4 data-[orientation=vertical]:mt-4",
      },
    },
  },
);

export type SeparatorProps = SeparatorPrimitive.Props &
  VariantProps<typeof separatorVariants>;

export function Separator({
  className,
  orientation = "horizontal",
  inset,
  ...props
}: SeparatorProps): React.ReactElement {
  return (
    <SeparatorPrimitive
      className={cn(separatorVariants({ inset }), className)}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
}

export { SeparatorPrimitive };
