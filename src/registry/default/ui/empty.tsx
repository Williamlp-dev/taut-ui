import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

const emptyMediaVariants = cva(
  "relative mb-3 flex shrink-0 items-center justify-center rounded-[30%]",
  {
    defaultVariants: { variant: "icon" },
    variants: {
      variant: {
        default: "",
        icon: "size-16",
        vibrant: "size-16",
      },
    },
  },
);

export function Empty({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-5 text-balance px-6 py-12 text-center md:py-16",
        className,
      )}
      data-slot="empty"
      {...props}
    />
  );
}

export function EmptyMedia({
  className,
  variant = "icon",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants>): React.ReactElement {
  return (
    <div
      className={cn(emptyMediaVariants({ variant }), className)}
      data-slot="empty-media"
      data-variant={variant}
      {...props}
    >
      {variant === "default" ? (
        children
      ) : (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 rotate-12 scale-105 rounded-[inherit] opacity-30",
              variant === "vibrant" ? "bg-primary" : "bg-secondary",
            )}
          />
          <span
            className={cn(
              "relative flex size-full items-center justify-center rounded-[inherit] [&_svg:not([class*='size-'])]:size-7 [&_svg]:pointer-events-none [&_svg]:shrink-0",
              variant === "vibrant"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            {children}
          </span>
        </>
      )}
    </div>
  );
}

export function EmptyHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex max-w-sm flex-col items-center gap-1.5 text-center",
        className,
      )}
      data-slot="empty-header"
      {...props}
    />
  );
}

export function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"h3">): React.ReactElement {
  return (
    <h3
      className={cn(
        "font-heading font-semibold text-foreground text-xl leading-7 tracking-tight",
        className,
      )}
      data-slot="empty-title"
      {...props}
    />
  );
}

export function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn(
        "max-w-[36ch] text-pretty text-muted-foreground text-sm leading-5 [&>a:hover]:underline [&>a]:text-primary [&>a]:underline-offset-4",
        className,
      )}
      data-slot="empty-description"
      {...props}
    />
  );
}

export function EmptyContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-wrap items-center justify-center gap-2",
        className,
      )}
      data-slot="empty-content"
      {...props}
    />
  );
}
