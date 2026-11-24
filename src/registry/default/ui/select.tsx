"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useRender } from "@base-ui/react/use-render";
import type { VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { inputVariants } from "@/registry/default/ui/input";
import { menuPopupVariants } from "@/registry/default/ui/menu";

const selectIconClassName =
  "inline-flex in-data-[size=lg]:size-10 in-data-[size=sm]:size-7 size-8 shrink-0 items-center justify-center in-data-[shape=rounded]:rounded-lg in-data-[shape=square]:rounded-md rounded-full text-muted-foreground group-hover/input:text-foreground group-focus-visible/input:text-primary group-active/input:text-primary in-data-popup-open:text-primary in-data-invalid:text-destructive! in-data-[size=lg]:[&_svg:not([class*='size-'])]:size-5 in-data-[size=sm]:[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='size-'])]:size-4.5";

const selectTriggerClassName =
  "cursor-pointer select-none justify-between pe-1 text-start outline-none focus-within:shadow-[inset_0_0_0_0.0625rem_var(--color-border)] data-[variant=outline]:focus-within:shadow-[inset_0_0_0_0.0625rem_var(--color-input)] data-[variant=outlined]:focus-within:shadow-[inset_0_0_0_0.0625rem_var(--color-input)] focus-visible:shadow-[inset_0_0_0_0.125rem_var(--color-primary)]! data-disabled:pointer-events-none data-disabled:opacity-38 data-invalid:shadow-[inset_0_0_0_0.125rem_var(--color-destructive)]! data-popup-open:shadow-[inset_0_0_0_0.125rem_var(--color-primary)]! [&>svg]:text-muted-foreground focus-visible:[&>svg]:text-primary data-popup-open:[&>svg]:text-primary aria-invalid:[&>svg]:text-destructive! data-invalid:[&>svg]:text-destructive!";

const selectStartAddonClassName =
  "pointer-events-none flex shrink-0 items-center justify-center in-data-invalid:text-destructive! text-muted-foreground group-focus-visible/input:text-primary in-data-popup-open:text-primary [&_svg:not([class*='size-'])]:size-4.5 in-data-[size=lg]:[&_svg:not([class*='size-'])]:size-5 in-data-[size=sm]:[&_svg:not([class*='size-'])]:size-4";

export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;

export const SelectPortal: typeof SelectPrimitive.Portal =
  SelectPrimitive.Portal;

export interface SelectButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof inputVariants> {
  startAddon?: React.ReactNode;
}

export function SelectButton({
  className,
  variant = "filled",
  shape = "pill",
  size = "default",
  startAddon,
  render,
  children,
  ...props
}: SelectButtonProps): React.ReactElement {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        {startAddon && (
          <span
            aria-hidden="true"
            className={selectStartAddonClassName}
            data-slot="select-start-addon"
          >
            {startAddon}
          </span>
        )}
        <span className="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
          {children}
        </span>
        <span className={selectIconClassName} data-slot="select-icon">
          <ChevronsUpDownIcon aria-hidden="true" />
        </span>
      </>
    ),
    className: cn(
      inputVariants({ shape, size, variant }),
      selectTriggerClassName,
      className,
    ),
    "data-shape": shape,
    "data-size": size,
    "data-slot": "select-button",
    "data-variant": variant,
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof inputVariants> & {
    startAddon?: React.ReactNode;
  };

export function SelectTrigger({
  className,
  variant = "filled",
  shape = "pill",
  size = "default",
  startAddon,
  children,
  ...props
}: SelectTriggerProps): React.ReactElement {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        inputVariants({ shape, size, variant }),
        selectTriggerClassName,
        className,
      )}
      data-shape={shape}
      data-size={size}
      data-slot="select-trigger"
      data-variant={variant}
      {...props}
    >
      {startAddon && (
        <span
          aria-hidden="true"
          className={selectStartAddonClassName}
          data-slot="select-start-addon"
        >
          {startAddon}
        </span>
      )}
      {children}
      <SelectPrimitive.Icon
        className={selectIconClassName}
        data-slot="select-icon"
      >
        <ChevronsUpDownIcon aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props): React.ReactElement {
  return (
    <SelectPrimitive.Value
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 truncate data-placeholder:text-muted-foreground/72 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="select-value"
      {...props}
    />
  );
}

export type SelectPopupProps = SelectPrimitive.Popup.Props &
  VariantProps<typeof menuPopupVariants> & {
    portalProps?: SelectPrimitive.Portal.Props;
    side?: SelectPrimitive.Positioner.Props["side"];
    sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
    align?: SelectPrimitive.Positioner.Props["align"];
    alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
    alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
    anchor?: SelectPrimitive.Positioner.Props["anchor"];
  };

export function SelectPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  anchor,
  portalProps,
  colorScheme,
  ...props
}: SelectPopupProps): React.ReactElement {
  return (
    <SelectPrimitive.Portal {...portalProps}>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50 select-none"
        data-slot="select-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(
            menuPopupVariants({ colorScheme }),
            "group/select-popup relative flex max-h-(--available-height) w-(--anchor-width) min-w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden bg-(--menu-bg) p-1.5 shadow-[0_0_0_0.0625rem_var(--menu-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)] data-[side=none]:min-w-[calc(var(--anchor-width)+0.25rem)] data-[side=none]:origin-(--transform-origin) data-[side=none]:transform-gpu data-ending-style:transition-none! data-[side=none]:data-starting-style:[scale:1_0.75] data-[side=none]:[transition-timing-function:linear(0,0.42_7%,0.85_16%,1.03_28%,1.015_44%,1.002_65%,1),ease]",
            className,
          )}
          data-slot="select-popup"
          {...props}
        >
          <SelectPrimitive.List
            className="flex max-h-[min(var(--available-height),22rem)] flex-col gap-0.5 overflow-y-auto overflow-x-hidden overscroll-contain rounded-[inherit] [scrollbar-color:color-mix(in_oklab,var(--menu-bg),var(--menu-fg)_28%)_transparent] [scrollbar-width:thin]"
            data-slot="select-list"
          >
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props): React.ReactElement {
  return (
    <SelectPrimitive.Item
      className={cn(
        "group relative flex min-h-9 pointer-coarse:min-h-10 cursor-default select-none items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial)",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0",
        "data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10",
        "data-selected:text-(color:--menu-sel-fg) data-selected:bg-(--menu-sel-bg)",
        "data-highlighted:rounded-xl data-selected:rounded-xl",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 motion-reduce:transition-none",
        "data-disabled:pointer-events-none data-disabled:opacity-38",
        "[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemText className="flex min-w-0 flex-1 items-center gap-2 truncate [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ms-auto flex shrink-0 items-center justify-center">
        <CheckIcon aria-hidden="true" className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props): React.ReactElement {
  return (
    <SelectPrimitive.Separator
      className={cn("mx-2.5 my-1 h-px bg-current opacity-12", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

export function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props): React.ReactElement {
  return (
    <SelectPrimitive.Group
      className={cn("flex flex-col gap-0.5 [[role=group]+&]:mt-1.5", className)}
      data-slot="select-group"
      {...props}
    />
  );
}

export function SelectLabel({
  className,
  ...props
}: SelectPrimitive.Label.Props): React.ReactElement {
  return (
    <SelectPrimitive.Label
      className={cn(
        "not-in-data-[slot=field]:mb-1.5 inline-flex cursor-default items-center gap-2 font-medium text-foreground text-sm leading-5 has-[+[data-shape=pill]]:px-1",
        className,
      )}
      data-slot="select-label"
      {...props}
    />
  );
}

export function SelectGroupLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(
        "px-3 py-1.5 font-medium text-muted-foreground text-xs",
        className,
      )}
      data-slot="select-group-label"
      {...props}
    />
  );
}

export { SelectPrimitive, SelectPopup as SelectContent };
