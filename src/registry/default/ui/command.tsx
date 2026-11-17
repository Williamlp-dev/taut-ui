"use client";

import { Dialog as CommandDialogPrimitive } from "@base-ui/react/dialog";
import { SearchIcon } from "lucide-react";
import type * as React from "react";
import { Ripple } from "@/registry/default/lib/ripple";
import { cn } from "@/registry/default/lib/utils";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from "@/registry/default/ui/autocomplete";

export const CommandDialog: typeof CommandDialogPrimitive.Root =
  CommandDialogPrimitive.Root;

export const CommandDialogPortal: typeof CommandDialogPrimitive.Portal =
  CommandDialogPrimitive.Portal;

export const CommandCreateHandle: typeof CommandDialogPrimitive.createHandle =
  CommandDialogPrimitive.createHandle;

export function CommandDialogTrigger(
  props: CommandDialogPrimitive.Trigger.Props,
): React.ReactElement {
  return (
    <CommandDialogPrimitive.Trigger
      data-slot="command-dialog-trigger"
      {...props}
    />
  );
}

export function CommandDialogBackdrop({
  className,
  ...props
}: CommandDialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-xs transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      data-slot="command-dialog-backdrop"
      {...props}
    />
  );
}

export function CommandDialogViewport({
  className,
  ...props
}: CommandDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center p-4 sm:p-6 sm:pt-[12dvh]",
        className,
      )}
      data-slot="command-dialog-viewport"
      {...props}
    />
  );
}

export function CommandDialogPopup({
  className,
  children,
  portalProps,
  ...props
}: CommandDialogPrimitive.Popup.Props & {
  portalProps?: CommandDialogPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <CommandDialogPortal {...portalProps}>
      <CommandDialogBackdrop />
      <CommandDialogViewport>
        <CommandDialogPrimitive.Popup
          className={cn(
            "relative isolate row-start-1 flex max-h-124 min-h-0 w-full min-w-70 max-w-xl origin-center flex-col overflow-hidden rounded-3xl border border-border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg outline-none will-change-transform before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-muted/72",
            "scale-[calc(1-0.05*var(--nested-dialogs))] opacity-[calc(1-var(--nested-dialogs))]",
            "[transition-duration:350ms,150ms,350ms] [transition-property:scale,opacity,translate] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1),ease-out,linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)]",
            "data-ending-style:scale-85 data-starting-style:scale-85 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-out motion-reduce:transition-none",
            className,
          )}
          data-slot="command-dialog-popup"
          {...props}
        >
          {children}
        </CommandDialogPrimitive.Popup>
      </CommandDialogViewport>
    </CommandDialogPortal>
  );
}

export function Command({
  autoHighlight = "always",
  keepHighlight = true,
  ...props
}: React.ComponentProps<typeof Autocomplete>): React.ReactElement {
  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      inline
      keepHighlight={keepHighlight}
      open
      {...props}
    />
  );
}

export function CommandInput({
  className,
  placeholder = undefined,
  variant = "outline",
  ...props
}: React.ComponentProps<typeof AutocompleteInput>): React.ReactElement {
  return (
    <div className="p-2 pb-1.5">
      <AutocompleteInput
        autoFocus
        className={cn(
          "shadow-[inset_0_0_0_0.0625rem_var(--color-border)]",
          className,
        )}
        placeholder={placeholder}
        startAddon={<SearchIcon />}
        variant={variant}
        {...props}
      />
    </div>
  );
}

export function CommandPanel({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "relative mx-2 not-has-[+[data-slot=command-footer]]:mb-2 min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-background text-card-foreground",
        className,
      )}
      data-slot="command-panel"
      {...props}
    />
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteList>): React.ReactElement {
  return (
    <AutocompleteList
      className={cn(
        "max-h-80 not-empty:scroll-py-1.5 not-empty:p-1.5",
        className,
      )}
      data-slot="command-list"
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteEmpty>): React.ReactElement {
  return (
    <AutocompleteEmpty
      className={cn(
        "not-empty:py-10 text-center text-muted-foreground text-sm",
        className,
      )}
      data-slot="command-empty"
      {...props}
    />
  );
}

export function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroup>): React.ReactElement {
  return (
    <AutocompleteGroup
      className={cn("[[role=group]+&]:mt-1", className)}
      data-slot="command-group"
      {...props}
    />
  );
}

export function CommandGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteGroupLabel>): React.ReactElement {
  return (
    <AutocompleteGroupLabel
      className={cn(
        "px-3 py-1.5 font-medium text-muted-foreground text-xs",
        className,
      )}
      data-slot="command-group-label"
      {...props}
    />
  );
}

export const CommandCollection: typeof AutocompleteCollection =
  AutocompleteCollection;

export function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AutocompleteItem>): React.ReactElement {
  return (
    <AutocompleteItem
      className={cn(
        "group relative flex min-h-9 cursor-default select-none items-center gap-2.5 rounded-lg px-3 py-1.5 font-medium text-sm outline-none",
        "transition-[border-radius] duration-350 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] motion-reduce:transition-none",
        "pointer-coarse:min-h-10 hover:rounded-xl active:rounded-xl data-highlighted:rounded-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-current before:opacity-0",
        "hover:before:opacity-8 focus-visible:before:opacity-10 active:before:opacity-10 data-highlighted:before:opacity-8 data-highlighted:active:before:opacity-10",
        "data-[variant=destructive]:text-destructive",
        "data-disabled:pointer-events-none data-inset:ps-9.5 data-disabled:opacity-38",
        "[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:text-muted-foreground data-highlighted:[&>svg]:text-foreground",
        className,
      )}
      data-slot="command-item"
      {...props}
    >
      {children}
      <Ripple hoverOpacity={0} />
    </AutocompleteItem>
  );
}

export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteSeparator>): React.ReactElement {
  return (
    <AutocompleteSeparator
      className={cn("mx-2.5 my-1 h-px bg-border last:hidden", className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "ms-auto font-medium font-mono text-xs tracking-widest opacity-72",
        className,
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

export function CommandFooter({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-2.5 text-muted-foreground text-xs",
        className,
      )}
      data-slot="command-footer"
      {...props}
    />
  );
}

export { CommandDialogPrimitive };
