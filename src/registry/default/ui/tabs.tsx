"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const tabsListVariants = cva(
  [
    "group/tabs-list relative z-0 flex items-center text-muted-foreground",
    "data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col",
    "data-stacked:[--tab-h:4rem]",
  ],
  {
    defaultVariants: { variant: "default" },
    variants: {
      variant: {
        circular:
          "w-fit gap-1.5 rounded-full border border-border bg-muted p-1 [--tab-h:2.25rem] [--tab-on:var(--color-primary-foreground)] [--tab-r:calc(infinity*1rem)]",
        clean:
          "w-full justify-center [--tab-h:3rem] [--tab-on:var(--color-primary)] [--tab-r:0rem] *:flex-1",
        default:
          "w-fit gap-0.5 rounded-xl bg-muted p-1 [--tab-h:2rem] [--tab-on:var(--color-primary-foreground)] [--tab-r:var(--radius-lg)]",
        dot: "w-full justify-center [--tab-h:3rem] [--tab-on:var(--color-primary)] [--tab-r:0rem] *:flex-1 data-[orientation=horizontal]:shadow-[inset_0_-0.0625rem_0_var(--color-border)] data-[orientation=vertical]:shadow-[inset_-0.0625rem_0_0_var(--color-border)]",
        outline:
          "w-fit gap-1 rounded-full border border-border p-1 [--tab-h:2.25rem] [--tab-on:var(--color-primary-foreground)] [--tab-r:calc(infinity*1rem)]",
        pill: "w-fit gap-1 rounded-full bg-muted p-1 [--tab-h:2.25rem] [--tab-on:var(--color-primary-foreground)] [--tab-r:calc(infinity*1rem)]",
        primary:
          "w-full justify-center [--tab-h:3rem] [--tab-on:var(--color-primary)] [--tab-r:0rem] *:flex-1 data-[orientation=horizontal]:shadow-[inset_0_-0.0625rem_0_var(--color-border)] data-[orientation=vertical]:shadow-[inset_-0.0625rem_0_0_var(--color-border)]",
        secondary:
          "w-full justify-center [--tab-h:3rem] [--tab-on:var(--color-primary)] [--tab-r:0rem] *:flex-1 data-[orientation=horizontal]:shadow-[inset_0_-0.0625rem_0_var(--color-border)] data-[orientation=vertical]:shadow-[inset_-0.0625rem_0_0_var(--color-border)]",
        underline:
          "w-fit gap-1 [--tab-h:2.5rem] [--tab-on:var(--color-primary)] [--tab-r:0rem] data-[orientation=horizontal]:shadow-[inset_0_-0.0625rem_0_var(--color-border)] data-[orientation=vertical]:shadow-[inset_-0.0625rem_0_0_var(--color-border)]",
      },
    },
  },
);

export type TabsVariant = NonNullable<
  VariantProps<typeof tabsListVariants>["variant"]
>;

export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row data-[orientation=vertical]:gap-4",
        className,
      )}
      data-slot="tabs"
      {...props}
    />
  );
}

export interface TabsListProps extends TabsPrimitive.List.Props {
  variant?: TabsVariant;
  stacked?: boolean;
}

export function TabsList({
  variant = "default",
  stacked = false,
  className,
  children,
  ...props
}: TabsListProps): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-slot="tabs-list"
      data-stacked={stacked ? "" : undefined}
      data-variant={variant}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className={cn(
          "absolute bottom-0 left-0 duration-200 [transition-property:width,height,translate] [transition-timing-function:linear(0,0.5_8%,0.9_20%,1.02_34%,1_60%,1)] motion-reduce:transition-none",
          (variant === "default" ||
            variant === "pill" ||
            variant === "outline") &&
            "-z-1 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) rounded-(--tab-r) bg-primary text-primary-foreground shadow-xs",
          variant === "circular" &&
            "-z-1 h-(--active-tab-height) w-(--active-tab-height) translate-x-[calc(var(--active-tab-left)+(var(--active-tab-width)-var(--active-tab-height))/2)] -translate-y-(--active-tab-bottom) rounded-full bg-primary text-primary-foreground shadow-xs",
          (variant === "primary" || variant === "clean") &&
            "z-10 rounded-full bg-primary data-[orientation=vertical]:right-0 data-[orientation=vertical]:left-auto data-[orientation=horizontal]:h-0.75 data-[orientation=vertical]:h-[calc(var(--active-tab-height)*0.5)] data-[orientation=horizontal]:w-[min(3rem,calc(var(--active-tab-width)*0.6))] data-[orientation=vertical]:w-0.75 data-[orientation=horizontal]:translate-x-[calc(var(--active-tab-left)+(var(--active-tab-width)-min(3rem,calc(var(--active-tab-width)*0.6)))/2)] data-[orientation=horizontal]:-translate-y-(--active-tab-bottom) data-[orientation=vertical]:-translate-y-[calc(var(--active-tab-bottom)+var(--active-tab-height)*0.25)]",
          (variant === "secondary" || variant === "underline") &&
            "z-10 bg-primary data-[orientation=vertical]:right-0 data-[orientation=vertical]:left-auto data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-x-(--active-tab-left) data-[orientation=horizontal]:-translate-y-(--active-tab-bottom) data-[orientation=vertical]:-translate-y-(--active-tab-bottom)",
          variant === "dot" &&
            "z-10 size-1.5 rounded-full bg-primary data-[orientation=vertical]:right-1.5 data-[orientation=vertical]:left-auto data-[orientation=horizontal]:translate-x-[calc(var(--active-tab-left)+(var(--active-tab-width)-0.375rem)/2)] data-[orientation=horizontal]:-translate-y-1.5 data-[orientation=vertical]:-translate-y-[calc(var(--active-tab-bottom)+(var(--active-tab-height)-0.375rem)/2)]",
        )}
        data-slot="tab-indicator"
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  ...props
}: TabsPrimitive.Tab.Props): React.ReactElement {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "relative z-1 flex h-(--tab-h) shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-(--tab-r) px-3.5 font-medium text-muted-foreground text-sm leading-5 outline-none transition-[color,background-color,box-shadow] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-disabled:pointer-events-none data-active:text-(--tab-on,var(--color-primary-foreground)) data-disabled:opacity-38 data-active:hover:text-(--tab-on,var(--color-primary-foreground))",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        "group-data-[variant=circular]/tabs-list:size-(--tab-h) group-data-[variant=circular]/tabs-list:px-0",
        "group-data-stacked/tabs-list:flex-col group-data-stacked/tabs-list:gap-1",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { TabsPrimitive, TabsTab as TabsTrigger, TabsPanel as TabsContent };
