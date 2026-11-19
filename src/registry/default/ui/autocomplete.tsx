"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import type { VariantProps } from "class-variance-authority";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Input,
  type InputProps,
  inputVariants,
} from "@/registry/default/ui/input";
import { menuPopupVariants } from "@/registry/default/ui/menu";

const actionButtonClasses =
  "in-data-[size=lg]:size-10 in-data-[size=sm]:size-7 size-8 shrink-0 in-data-[shape=rounded]:rounded-lg in-data-[shape=square]:rounded-md rounded-full text-muted-foreground hover:text-foreground group-focus-within/input:text-primary in-data-invalid:text-destructive!";

const AutocompleteCtrlSpaceContext: React.Context<(() => void) | null> =
  React.createContext<(() => void) | null>(null);

export type AutocompleteProps = React.ComponentProps<
  typeof AutocompletePrimitive.Root
> & {
  openOnCtrlSpace?: boolean;
};

export function Autocomplete({
  openOnCtrlSpace = false,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: AutocompleteProps): React.ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false,
  );
  const isControlled = open !== undefined;

  const openPopup = React.useCallback((): void => {
    if (!isControlled) {
      setUncontrolledOpen(true);
    }
  }, [isControlled]);

  if (!openOnCtrlSpace) {
    return (
      <AutocompletePrimitive.Root
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        open={open}
        {...props}
      />
    );
  }

  return (
    <AutocompleteCtrlSpaceContext.Provider value={openPopup}>
      <AutocompletePrimitive.Root
        defaultOpen={defaultOpen}
        onOpenChange={(
          nextOpen: boolean,
          eventDetails: AutocompletePrimitive.Root.OpenChangeEventDetails,
        ): void => {
          if (!isControlled) {
            setUncontrolledOpen(nextOpen);
          }
          onOpenChange?.(nextOpen, eventDetails);
        }}
        open={isControlled ? open : uncontrolledOpen}
        {...props}
      />
    </AutocompleteCtrlSpaceContext.Provider>
  );
}

export function AutocompleteInput({
  className,
  showTrigger = false,
  showClear = false,
  startAddon,
  variant = "filled",
  shape = "pill",
  size = "default",
  ref,
  triggerProps,
  clearProps,
  onKeyDown,
  ...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> &
  Pick<InputProps, "shape" | "variant"> & {
    showTrigger?: boolean;
    showClear?: boolean;
    startAddon?: React.ReactNode;
    size?: "sm" | "default" | "md" | "lg" | number;
    ref?: React.Ref<HTMLInputElement>;
    triggerProps?: AutocompletePrimitive.Trigger.Props;
    clearProps?: AutocompletePrimitive.Clear.Props;
  }): React.ReactElement {
  const variantSize = typeof size === "number" ? "default" : size;
  const openOnCtrlSpace = React.useContext(AutocompleteCtrlSpaceContext);

  return (
    <AutocompletePrimitive.InputGroup
      className={cn(
        inputVariants({ shape, size: variantSize, variant }),
        "not-has-[>*.w-full]:w-fit has-[[data-slot=autocomplete-clear]]:pe-1 has-[[data-slot=autocomplete-trigger]]:pe-1 data-popup-open:shadow-[inset_0_0_0_0.125rem_var(--color-primary)]",
        className,
      )}
      data-shape={shape}
      data-size={variantSize}
      data-slot="autocomplete-input-group"
      data-variant={variant}
    >
      {startAddon && (
        <div
          aria-hidden="true"
          className="pointer-events-none flex shrink-0 items-center justify-center in-data-invalid:text-destructive! text-muted-foreground group-focus-within/input:text-primary [&_svg:not([class*='size-'])]:size-4.5 in-data-[size=lg]:[&_svg:not([class*='size-'])]:size-5 in-data-[size=sm]:[&_svg:not([class*='size-'])]:size-4"
          data-slot="autocomplete-start-addon"
        >
          {startAddon}
        </div>
      )}
      <AutocompletePrimitive.Input
        className="w-full"
        data-slot="autocomplete-input"
        onKeyDown={(
          event: Parameters<
            NonNullable<AutocompletePrimitive.Input.Props["onKeyDown"]>
          >[0],
        ): void => {
          if (openOnCtrlSpace && event.ctrlKey && event.code === "Space") {
            event.preventDefault();
            openOnCtrlSpace();
          }
          onKeyDown?.(event);
        }}
        ref={ref}
        render={<Input nativeInput size={variantSize} unstyled />}
        {...props}
      />
      {showClear && <AutocompleteClear {...clearProps} />}
      {showTrigger && (
        <AutocompleteTrigger
          className="in-[[data-slot=autocomplete-input-group]:has([data-slot=autocomplete-clear])]:hidden"
          {...triggerProps}
        >
          <AutocompletePrimitive.Icon data-slot="autocomplete-icon">
            <ChevronsUpDownIcon
              aria-hidden="true"
              className="in-data-[size=lg]:size-5 in-data-[size=sm]:size-4 size-4.5"
            />
          </AutocompletePrimitive.Icon>
        </AutocompleteTrigger>
      )}
    </AutocompletePrimitive.InputGroup>
  );
}

export function AutocompletePopup({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  portalProps,
  colorScheme,
  ...props
}: AutocompletePrimitive.Popup.Props &
  VariantProps<typeof menuPopupVariants> & {
    align?: AutocompletePrimitive.Positioner.Props["align"];
    sideOffset?: AutocompletePrimitive.Positioner.Props["sideOffset"];
    alignOffset?: AutocompletePrimitive.Positioner.Props["alignOffset"];
    side?: AutocompletePrimitive.Positioner.Props["side"];
    anchor?: AutocompletePrimitive.Positioner.Props["anchor"];
    portalProps?: AutocompletePrimitive.Portal.Props;
  }): React.ReactElement {
  return (
    <AutocompletePrimitive.Portal {...portalProps}>
      <AutocompletePrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50 select-none"
        data-slot="autocomplete-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <AutocompletePrimitive.Popup
          className={cn(
            menuPopupVariants({ colorScheme }),
            "group/autocomplete-popup relative flex max-h-(--available-height) w-(--anchor-width) min-w-(--anchor-width) max-w-(--available-width) flex-col overflow-hidden bg-(--menu-bg) p-1.5 shadow-[0_0_0_0.0625rem_var(--menu-ring),0_0.25rem_0.5rem_0.1875rem_rgb(0_0_0/0.15),0_0.0625rem_0.1875rem_0_rgb(0_0_0/0.3)] data-ending-style:transition-none",
            className,
          )}
          data-slot="autocomplete-popup"
          {...props}
        >
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

export function AutocompleteItem({
  className,
  children,
  ...props
}: AutocompletePrimitive.Item.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Item
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
      data-slot="autocomplete-item"
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  );
}

export function AutocompleteSeparator({
  className,
  ...props
}: AutocompletePrimitive.Separator.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Separator
      className={cn("mx-2.5 my-1 h-px bg-current opacity-12", className)}
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

export function AutocompleteGroup({
  className,
  ...props
}: AutocompletePrimitive.Group.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Group
      className={cn("flex flex-col gap-0.5 [[role=group]+&]:mt-1.5", className)}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

export function AutocompleteGroupLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.GroupLabel
      className={cn(
        "px-3 py-1.5 font-medium text-muted-foreground text-xs",
        className,
      )}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

export function AutocompleteEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Empty
      className={cn("not-empty:p-3 text-center text-sm opacity-72", className)}
      data-slot="autocomplete-empty"
      {...props}
    />
  );
}

export function AutocompleteRow({
  className,
  ...props
}: AutocompletePrimitive.Row.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Row
      className={className}
      data-slot="autocomplete-row"
      {...props}
    />
  );
}

export const AutocompleteValue: typeof AutocompletePrimitive.Value =
  AutocompletePrimitive.Value;

export function AutocompleteList({
  className,
  ...props
}: AutocompletePrimitive.List.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.List
      className={cn(
        "flex max-h-[min(var(--available-height),22rem)] flex-col gap-0.5 overflow-y-auto overflow-x-hidden overscroll-contain rounded-[inherit] [scrollbar-color:color-mix(in_oklab,currentColor_25%,transparent)_transparent] [scrollbar-width:thin] empty:hidden",
        className,
      )}
      data-slot="autocomplete-list"
      {...props}
    />
  );
}

export function AutocompleteStatus({
  className,
  ...props
}: AutocompletePrimitive.Status.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Status
      className={cn(
        "px-3 py-2 font-medium text-xs opacity-72 empty:m-0 empty:p-0",
        className,
      )}
      data-slot="autocomplete-status"
      {...props}
    />
  );
}

export function AutocompleteTrigger({
  className,
  children,
  ...props
}: AutocompletePrimitive.Trigger.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Trigger
      aria-label="Show options"
      className={cn(actionButtonClasses, className)}
      data-slot="autocomplete-trigger"
      render={<Button size="icon-xs" variant="ghost" />}
      {...props}
    >
      {children ?? (
        <ChevronsUpDownIcon
          aria-hidden="true"
          className="in-data-[size=lg]:size-5 in-data-[size=sm]:size-4 size-4.5"
        />
      )}
    </AutocompletePrimitive.Trigger>
  );
}

export function AutocompleteClear({
  className,
  children,
  ...props
}: AutocompletePrimitive.Clear.Props): React.ReactElement {
  return (
    <AutocompletePrimitive.Clear
      aria-label="Clear"
      className={cn(actionButtonClasses, className)}
      data-slot="autocomplete-clear"
      render={<Button size="icon-xs" variant="ghost" />}
      {...props}
    >
      {children ?? (
        <XIcon
          aria-hidden="true"
          className="in-data-[size=lg]:size-5 in-data-[size=sm]:size-4 size-4.5"
        />
      )}
    </AutocompletePrimitive.Clear>
  );
}

export const AutocompleteCollection: typeof AutocompletePrimitive.Collection =
  AutocompletePrimitive.Collection;

export const useAutocompleteFilter: typeof AutocompletePrimitive.useFilter =
  AutocompletePrimitive.useFilter;

export { AutocompletePrimitive };
