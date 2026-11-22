"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const avatarVariants = cva(
  "relative isolate inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--color-card),var(--color-primary)_14%)] align-middle font-medium text-secondary-foreground [.taut_&]:bg-secondary",
  {
    defaultVariants: { size: "default" },
    variants: {
      size: {
        default: "size-10 text-sm leading-5",
        lg: "size-12 text-base leading-6",
        sm: "size-8 text-xs leading-4",
        xl: "size-14 text-lg leading-6",
      },
    },
  },
);

export const avatarGroupVariants = cva(
  [
    "inline-flex items-center [--avatar-ring:var(--color-background)]",
    "*:data-[slot=avatar]:not-first:ms-[calc(-1*var(--avatar-overlap))]",
    "*:data-[slot=avatar]:not-first:shadow-[0_0_0_var(--avatar-gap)_var(--avatar-ring)]",
    "*:data-[slot=avatar]:transition-transform *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-[cubic-bezier(0.05,0.7,0.1,1)] motion-reduce:*:data-[slot=avatar]:transition-none",
    "hover:*:data-[slot=avatar]:nth-2:translate-x-(--avatar-spread) hover:*:data-[slot=avatar]:nth-3:translate-x-[calc(var(--avatar-spread)*2)] hover:*:data-[slot=avatar]:nth-4:translate-x-[calc(var(--avatar-spread)*3)] hover:*:data-[slot=avatar]:nth-5:translate-x-[calc(var(--avatar-spread)*4)] hover:*:data-[slot=avatar]:nth-6:translate-x-[calc(var(--avatar-spread)*5)]",
  ],
  {
    defaultVariants: { size: "default" },
    variants: {
      size: {
        default:
          "[--avatar-gap:0.1875rem] [--avatar-overlap:0.625rem] [--avatar-spread:0.375rem] *:data-[slot=avatar]:size-10 *:data-[slot=avatar]:text-sm",
        lg: "[--avatar-gap:0.1875rem] [--avatar-overlap:0.75rem] [--avatar-spread:0.4375rem] *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:text-base",
        sm: "[--avatar-gap:0.125rem] [--avatar-overlap:0.5rem] [--avatar-spread:0.25rem] *:data-[slot=avatar]:size-8 *:data-[slot=avatar]:text-xs",
        xl: "[--avatar-gap:0.21875rem] [--avatar-overlap:0.875rem] [--avatar-spread:0.5rem] *:data-[slot=avatar]:size-14 *:data-[slot=avatar]:text-lg",
      },
    },
  },
);

export function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants>): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size }), className)}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cn(
        "absolute inset-0 z-10 size-full object-cover data-error:invisible data-loading:invisible",
        className,
      )}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "absolute inset-0 flex size-full items-center justify-center rounded-[inherit] text-secondary-foreground uppercase",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export function AvatarGroup({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupVariants>): React.ReactElement {
  return (
    <div
      className={cn(avatarGroupVariants({ size }), className)}
      data-size={size}
      data-slot="avatar-group"
      role="group"
      {...props}
    />
  );
}

export { AvatarPrimitive };
