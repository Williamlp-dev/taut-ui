import type * as React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps extends React.ComponentProps<"section"> {
  align?: "center" | "start";
}

export function PageHeader({
  align = "center",
  className,
  children,
  ...props
}: PageHeaderProps): React.ReactElement {
  return (
    <section className={cn("w-full", className)} {...props}>
      <div
        className={cn(
          "container flex flex-col gap-3 py-10 md:py-14 lg:py-16 xl:gap-4",
          align === "center"
            ? "items-center text-center"
            : "items-start text-start",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function PageHeaderHeading({
  className,
  ...props
}: React.ComponentProps<"h1">): React.ReactElement {
  return (
    <h1
      className={cn(
        "max-w-4xl text-balance font-bold font-heading text-4xl text-foreground leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn(
        "max-w-2xl text-balance text-base text-muted-foreground leading-relaxed sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("mt-2 flex flex-wrap items-center gap-2.5", className)}
      {...props}
    />
  );
}
