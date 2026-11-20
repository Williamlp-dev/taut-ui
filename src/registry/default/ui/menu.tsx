"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Switch } from "@/registry/default/ui/switch";

export const menuPopupVariants = cva(
  [
    "group/menu-popup relative flex max-h-(--available-height) min-w-40 max-w-72 flex-col rounded-2xl outline-none data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom",
    "text-(color:--menu-fg)",
    "[--spatial:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)]",
    "[transition-duration:350ms,150ms] [transition-property:scale,opacity] [transition-timing-function:var(--spatial),ease] motion-reduce:transition-none",
    "data-ending-style:scale-90 data-starting-style:scale-75 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:[transition-duration:100ms] data-ending-style:[transition-timing-function:ease]",
  ],
  {
    defaultVariants: { colorScheme: "standard" },
    variants: {
      colorScheme: {
        standard:
          "[--menu-bg:color-mix(in_oklab,var(--color-popover),var(--color-primary)_8%)] [--menu-fg:var(--color-popover-foreground)] [--menu-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_22%)] [--menu-sel-bg:color-mix(in_oklab,var(--color-popover),var(--color-primary)_16%)] [--menu-sel-fg:var(--color-secondary-foreground)]",
        vibrant:
          "[--menu-bg:color-mix(in_oklab,var(--color-popover),var(--color-primary)_18%)] [--menu-fg:var(--color-secondary-foreground)] [--menu-ring:color-mix(in_oklab,var(--color-popover),var(--color-primary)_32%)] [--menu-sel-bg:var(--color-primary)] [--menu-sel-fg:var(--color-primary-foreground)]",
      },
    },
  },
);

export const MenuCreateHandle: typeof MenuPrimitive.createHandle =
  MenuPrimitive.createHandle;

export const Menu: typeof MenuPrimitive.Root = MenuPrimitive.Root;

export const MenuPortal: typeof MenuPrimitive.Portal = MenuPrimitive.Portal;

export function MenuTrigger({
  className,
  children,
  ...props
}: MenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <MenuPrimitive.Trigger
      className={className}
      data-slot="menu-trigger"
      {...props}
    >
      {children}
    </MenuPrimitive.Trigger>
  );
}

export function MenuPopup({
  children,
  className,
  sideOffset = 6,
  align = "center",
  alignOffset,
  side = "bottom",
  anchor,
  portalProps,
  colorScheme,
  gap = false,
  scrollFade = true,
  ...props
}: MenuPrimitive.Popup.Props &
  VariantProps<typeof menuPopupVariants> & {
    align?: MenuPrimitive.Positioner.Props["align"];
    sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
    alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
    side?: MenuPrimitive.Positioner.Props["side"];
    anchor?: MenuPrimitive.Positioner.Props["anchor"];
    portalProps?: MenuPrimitive.Portal.Props;
    gap?: boolean;
    scrollFade?: boolean;
  }): React.ReactElement {
  return (
    <MenuPortal {...portalProps}>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50"
        data-slot="menu-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(
            menuPopupVariants({ colorScheme }),
            !gap &&
              "overflow-hidden bg-(--menu-bg) shadow-[0_0_0_0.0625rem_var(--menu-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)]",
            className,
          )}
          data-gap={gap ? "" : undefined}
          data-slot="menu-popup"
          {...props}
        >
          {gap ? (
            <div className="flex flex-col gap-1.5">{children}</div>
          ) : (
            <ScrollArea
              clampContentMinWidth={false}
              className="max-h-[inherit] **:data-[slot=scroll-area-scrollbar]:my-2 **:data-[slot=scroll-area-viewport]:max-h-[inherit] **:data-[slot=scroll-area-viewport]:scroll-py-1.5 **:data-[slot=scroll-area-thumb]:bg-current/30 **:data-[slot=scroll-area-thumb]:hover:bg-current/50"
              overscrollContain
              scrollFade={scrollFade}
            >
              <div className="flex flex-col gap-0.5 p-1.5">{children}</div>
            </ScrollArea>
          )}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPortal>
  );
}

export function MenuGroup({
  className,
  ...props
}: MenuPrimitive.Group.Props): React.ReactElement {
  return (
    <MenuPrimitive.Group
      className={cn(
        "flex flex-col gap-0.5 group-data-gap/menu-popup:rounded-2xl group-data-gap/menu-popup:bg-(--menu-bg) group-data-gap/menu-popup:p-1.5 group-data-gap/menu-popup:shadow-[0_0_0_0.0625rem_var(--menu-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)]",
        className,
      )}
      data-slot="menu-group"
      {...props}
    />
  );
}

export function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.ReactElement {
  return (
    <MenuPrimitive.Item
      className={cn(
        "group relative flex min-h-9 pointer-coarse:min-h-10 cursor-default select-none items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial) before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-checked:rounded-xl data-highlighted:rounded-xl data-popup-open:rounded-xl data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-38 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-inset={inset}
      data-slot="menu-item"
      data-variant={variant}
      {...props}
    />
  );
}

export function MenuLinkItem({
  className,
  inset,
  variant = "default",
  closeOnClick = true,
  ...props
}: MenuPrimitive.LinkItem.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.ReactElement {
  return (
    <MenuPrimitive.LinkItem
      className={cn(
        "group relative flex min-h-9 pointer-coarse:min-h-10 cursor-default select-none items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial) before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-checked:rounded-xl data-highlighted:rounded-xl data-popup-open:rounded-xl data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-38 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      closeOnClick={closeOnClick}
      data-inset={inset}
      data-slot="menu-link-item"
      data-variant={variant}
      {...props}
    />
  );
}

export function MenuCheckboxItem({
  className,
  children,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  variant = "default",
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  variant?: "default" | "switch";
}): React.ReactElement {
  const [inner, setInner] = React.useState(defaultChecked);
  const checked = checkedProp ?? inner;

  if (variant === "switch") {
    return (
      <MenuPrimitive.CheckboxItem
        checked={checked}
        className={cn(
          "group relative flex min-h-9 pointer-coarse:min-h-10 cursor-default select-none items-center justify-between gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial) before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-checked:rounded-xl data-highlighted:rounded-xl data-popup-open:rounded-xl data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-38 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
          className,
        )}
        data-slot="menu-checkbox-item"
        disabled={disabled}
        onCheckedChange={(next, eventDetails) => {
          setInner(next);
          onCheckedChange?.(next, eventDetails);
        }}
        {...props}
      >
        <span>{children}</span>
        <Switch
          aria-hidden="true"
          checked={checked}
          className="pointer-events-none [zoom:0.75]"
          disabled={disabled}
          tabIndex={-1}
        />
      </MenuPrimitive.CheckboxItem>
    );
  }

  return (
    <MenuPrimitive.CheckboxItem
      checked={checkedProp}
      className={cn(
        "group data-checked:text-(color:--menu-sel-fg) relative grid min-h-9 pointer-coarse:min-h-10 cursor-default select-none grid-cols-[1rem_1fr] items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial) before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-checked:rounded-xl data-highlighted:rounded-xl data-popup-open:rounded-xl data-checked:bg-(--menu-sel-bg) data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-38 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-slot="menu-checkbox-item"
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <MenuPrimitive.CheckboxItemIndicator className="col-start-1">
        <CheckIcon aria-hidden="true" />
      </MenuPrimitive.CheckboxItemIndicator>
      <span className="col-start-2">{children}</span>
    </MenuPrimitive.CheckboxItem>
  );
}

export function MenuRadioGroup(
  props: MenuPrimitive.RadioGroup.Props,
): React.ReactElement {
  return (
    <MenuPrimitive.RadioGroup
      className="flex flex-col gap-0.5"
      data-slot="menu-radio-group"
      {...props}
    />
  );
}

export function MenuRadioItem({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props): React.ReactElement {
  return (
    <MenuPrimitive.RadioItem
      className={cn(
        "group data-checked:text-(color:--menu-sel-fg) relative grid min-h-9 pointer-coarse:min-h-10 cursor-default select-none grid-cols-[1rem_1fr] items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial) before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-checked:rounded-xl data-highlighted:rounded-xl data-popup-open:rounded-xl data-checked:bg-(--menu-sel-bg) data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-38 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-slot="menu-radio-item"
      {...props}
    >
      <MenuPrimitive.RadioItemIndicator className="col-start-1">
        <CheckIcon aria-hidden="true" />
      </MenuPrimitive.RadioItemIndicator>
      <span className="col-start-2">{children}</span>
    </MenuPrimitive.RadioItem>
  );
}

export function MenuGroupLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <MenuPrimitive.GroupLabel
      className={cn(
        "px-3 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9.5",
        className,
      )}
      data-inset={inset}
      data-slot="menu-label"
      {...props}
    />
  );
}

export function MenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props): React.ReactElement {
  return (
    <MenuPrimitive.Separator
      className={cn("mx-2.5 my-1 h-px bg-current opacity-12", className)}
      data-slot="menu-separator"
      {...props}
    />
  );
}

export function MenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "ms-auto font-medium font-mono text-xs tracking-widest opacity-72",
        className,
      )}
      data-slot="menu-shortcut"
      {...props}
    />
  );
}

export function MenuSub(
  props: MenuPrimitive.SubmenuRoot.Props,
): React.ReactElement {
  return <MenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props} />;
}

export function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={cn(
        "group data-popup-open:text-(color:--menu-sel-fg) relative flex min-h-9 pointer-coarse:min-h-10 cursor-default select-none items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none transition-[border-radius] duration-350 ease-(--spatial) before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-2 data-disabled:pointer-events-none data-checked:rounded-xl data-highlighted:rounded-xl data-popup-open:rounded-xl data-popup-open:bg-(--menu-sel-bg) data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-38 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10 data-highlighted:focus-visible:before:opacity-10 motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0",
        className,
      )}
      data-inset={inset}
      data-slot="menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon aria-hidden="true" className="ms-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export function MenuSubPopup({
  className,
  sideOffset = 4,
  alignOffset,
  align = "start",
  ...props
}: Omit<React.ComponentProps<typeof MenuPopup>, "side">): React.ReactElement {
  const defaultAlignOffset = align !== "center" ? -4 : undefined;
  return (
    <MenuPopup
      align={align}
      alignOffset={alignOffset ?? defaultAlignOffset}
      className={className}
      data-slot="menu-sub-content"
      side="inline-end"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export {
  MenuPrimitive,
  MenuCreateHandle as DropdownMenuCreateHandle,
  Menu as DropdownMenu,
  MenuPortal as DropdownMenuPortal,
  MenuTrigger as DropdownMenuTrigger,
  MenuPopup as DropdownMenuContent,
  MenuGroup as DropdownMenuGroup,
  MenuItem as DropdownMenuItem,
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem as DropdownMenuRadioItem,
  MenuGroupLabel as DropdownMenuLabel,
  MenuSeparator as DropdownMenuSeparator,
  MenuShortcut as DropdownMenuShortcut,
  MenuSub as DropdownMenuSub,
  MenuSubTrigger as DropdownMenuSubTrigger,
  MenuSubPopup as DropdownMenuSubContent,
};
