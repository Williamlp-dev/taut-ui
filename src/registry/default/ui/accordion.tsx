"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import type React from "react";
import { Ripple } from "@/registry/default/lib/ripple";
import { cn } from "@/registry/default/lib/utils";

export function Accordion({
  className,
  ...props
}: AccordionPrimitive.Root.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Root
      className={cn("flex flex-col gap-0.5", className)}
      data-slot="accordion"
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "overflow-hidden border border-border bg-card text-card-foreground",
        "rounded-sm last:rounded-b-2xl first:rounded-t-2xl data-panel-open:rounded-2xl",
        "transition-[border-radius] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] motion-reduce:transition-none",
        "has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-ring has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-background",
        "data-disabled:pointer-events-none data-disabled:opacity-38",
        className,
      )}
      data-slot="accordion-item"
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/trigger relative flex min-h-13 flex-1 cursor-pointer items-center gap-4 overflow-hidden px-5 py-3.5 text-start font-medium text-base leading-6 outline-none disabled:pointer-events-none",
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        <span className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none relative z-10 grid size-6 shrink-0 place-items-center text-muted-foreground transition-[rotate] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] group-data-panel-open/trigger:rotate-180 motion-reduce:transition-none"
          data-slot="accordion-indicator"
        >
          <ChevronDownIcon className="size-5" />
        </span>
        <Ripple />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Panel
      className="h-(--accordion-panel-height) overflow-hidden text-muted-foreground text-sm leading-5 transition-[height] duration-350 ease-[linear(0,0.5_8%,0.9_20%,1.02_34%,1_60%,1)] data-ending-style:h-0 data-starting-style:h-0 data-ending-style:duration-200 data-ending-style:ease-out motion-reduce:transition-none"
      data-slot="accordion-panel"
      {...props}
    >
      <div
        className={cn(
          "px-5 pb-4 in-data-ending-style:opacity-0 in-data-starting-style:opacity-0 transition-opacity duration-200 motion-reduce:transition-none",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { AccordionPrimitive, AccordionPanel as AccordionContent };
