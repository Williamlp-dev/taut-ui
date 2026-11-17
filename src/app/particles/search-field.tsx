"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, SearchIcon, TagIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { getCategorySortOrder } from "@/registry/registry-categories";

export interface CategoryOption {
  label: string;
  value: string;
  count: number;
}

interface SearchFieldProps {
  selectedItems: CategoryOption[];
  onItemsChange: (items: CategoryOption[]) => void;
  items: CategoryOption[];
}

interface RegistryItem {
  type?: string;
  categories?: string[];
}

const particles = (Object.values(Index) as RegistryItem[]).filter(
  (item) => item.type === "registry:example",
);

export default function SearchField({
  selectedItems,
  onItemsChange,
  items,
}: SearchFieldProps): React.ReactElement {
  const [open, setOpen] = useState(selectedItems.length === 0);
  const chipsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedItems.length === 0) {
      setOpen(true);
    }
  }, [selectedItems.length]);

  const groupedItems = useMemo(() => {
    const selectedValues = selectedItems.map((item) => item.value);

    const availableItems = items.filter((item) => {
      if (selectedValues.includes(item.value)) {
        return true;
      }

      const testValues = [...selectedValues, item.value];
      return particles.some((particle) => {
        const categories = particle.categories ?? [];
        return testValues.every((value) => categories.includes(value));
      });
    });

    const enabled: CategoryOption[] = [];
    const disabled: CategoryOption[] = [];

    for (const item of items) {
      const isSelected = selectedValues.includes(item.value);
      const isAvailable = availableItems.some(
        (available) => available.value === item.value,
      );

      if (isSelected || isAvailable) {
        enabled.push(item);
      } else {
        disabled.push(item);
      }
    }

    const sortedEnabled = [...enabled].sort((a, b) => {
      const aSelected = selectedValues.includes(a.value);
      const bSelected = selectedValues.includes(b.value);

      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;

      return getCategorySortOrder(a.value) - getCategorySortOrder(b.value);
    });

    const sortedDisabled = [...disabled].sort(
      (a, b) => getCategorySortOrder(a.value) - getCategorySortOrder(b.value),
    );

    const groups: Array<{
      type: "enabled" | "disabled";
      items: CategoryOption[];
    }> = [];

    if (sortedEnabled.length > 0) {
      groups.push({ items: sortedEnabled, type: "enabled" });
    }

    if (sortedDisabled.length > 0) {
      groups.push({ items: sortedDisabled, type: "disabled" });
    }

    return groups;
  }, [selectedItems, items]);

  const handleValueChange = (newItems: CategoryOption[]) => {
    onItemsChange(newItems);
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <ComboboxPrimitive.Root
        aria-label="Filter particles"
        autoHighlight
        isItemEqualToValue={(a, b) => a.value === b.value}
        items={groupedItems}
        itemToStringLabel={(item) => item.label}
        multiple
        onOpenChange={setOpen}
        onValueChange={handleValueChange}
        open={open}
        value={selectedItems}
      >
        <ComboboxPrimitive.Chips
          className={cn(
            "relative flex min-h-12 w-full flex-wrap items-center gap-1.5 rounded-2xl bg-background not-dark:bg-clip-padding p-2 ps-3.5 text-base text-foreground outline-none dark:bg-input/32",
            "shadow-[inset_0_0_0_1px_var(--color-input)] focus-within:shadow-[inset_0_0_0_2px_var(--color-primary)]",
          )}
          data-slot="combobox-chips"
          ref={chipsRef}
        >
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center pe-1 text-muted-foreground"
          >
            <SearchIcon className="size-4.5" strokeWidth={2} />
          </span>

          <ComboboxPrimitive.Value>
            {(value: CategoryOption[]) => (
              <>
                {value?.map((item) => (
                  <ComboboxPrimitive.Chip
                    aria-label={item.label}
                    className="inline-flex h-7 items-center gap-1.5 rounded-full bg-secondary ps-2.5 pe-1 font-medium text-secondary-foreground text-xs outline-none"
                    data-slot="combobox-chip"
                    key={item.value}
                  >
                    <TagIcon className="size-3.5 opacity-75" strokeWidth={2} />
                    <span>{item.label}</span>
                    <ComboboxPrimitive.ChipRemove
                      aria-label={`Remove ${item.label}`}
                      className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full opacity-70 transition-opacity hover:bg-foreground/10 hover:opacity-100"
                    >
                      <XIcon className="size-3" strokeWidth={2} />
                    </ComboboxPrimitive.ChipRemove>
                  </ComboboxPrimitive.Chip>
                ))}
                <ComboboxPrimitive.Input
                  aria-label="Search components"
                  autoFocus
                  className="min-w-28 flex-1 bg-transparent py-1 ps-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  placeholder={
                    value?.length
                      ? "Add filter..."
                      : "Filter by component or tag..."
                  }
                />
              </>
            )}
          </ComboboxPrimitive.Value>

          {selectedItems.length > 0 && (
            <button
              aria-label="Clear all filters"
              className="ms-auto inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => onItemsChange([])}
              type="button"
            >
              <span>Clear</span>
              <XIcon className="size-3.5" strokeWidth={2} />
            </button>
          )}
        </ComboboxPrimitive.Chips>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner
            align="start"
            anchor={chipsRef}
            className="z-40 select-none"
            side="bottom"
            sideOffset={6}
          >
            <ComboboxPrimitive.Popup
              className={cn(
                "flex max-h-[min(var(--available-height),23rem)] w-(--anchor-width) min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) flex-col overflow-hidden rounded-[20px] border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none",
                "[transition-duration:300ms,150ms] [transition-property:scale,opacity] [transition-timing-function:linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1),ease-out]",
                "data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-100 data-ending-style:ease-out motion-reduce:transition-none",
              )}
              data-slot="combobox-popup"
            >
              <ComboboxPrimitive.Empty className="not-empty:p-4 text-center text-muted-foreground text-sm">
                No filters found.
              </ComboboxPrimitive.Empty>
              <ScrollArea
                className="flex-1"
                overscrollContain
                scrollbarGutter
                scrollFade
              >
                <ComboboxPrimitive.List className="not-empty:p-1">
                  {(group: (typeof groupedItems)[number]) => (
                    <React.Fragment key={group.type}>
                      {group.type === "disabled" && (
                        <ComboboxPrimitive.Separator className="mx-2 my-1.5 h-px bg-border" />
                      )}
                      <ComboboxPrimitive.Group
                        className="[[role=group]+&]:mt-1.5"
                        items={group.items}
                      >
                        <ComboboxPrimitive.GroupLabel className="px-3 py-1.5 font-medium text-muted-foreground text-xs">
                          {group.type === "enabled"
                            ? "Filter particles"
                            : "No matches"}
                        </ComboboxPrimitive.GroupLabel>
                        <ComboboxPrimitive.Collection>
                          {(item: CategoryOption) => (
                            <ComboboxPrimitive.Item
                              className={cn(
                                "group relative flex min-h-10 cursor-default select-none items-center gap-2.5 rounded-[10px] px-3 text-sm outline-none",
                                "data-highlighted:rounded-[14px] data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                                "transition-[border-radius] duration-200 ease-[linear(0,0.42_6%,0.86_14%,1.06_24%,1.07_32%,1.02_46%,0.995_60%,1)] motion-reduce:transition-none",
                                "data-disabled:pointer-events-none data-disabled:opacity-38",
                              )}
                              disabled={group.type === "disabled"}
                              key={item.value}
                              value={item}
                            >
                              <ComboboxPrimitive.ItemIndicator className="flex size-4 shrink-0 items-center justify-center text-primary">
                                <CheckIcon className="size-4" strokeWidth={2} />
                              </ComboboxPrimitive.ItemIndicator>
                              <TagIcon
                                className="size-4 shrink-0 text-muted-foreground group-data-selected:hidden"
                                strokeWidth={2}
                              />
                              <span className="flex-1 truncate font-medium">
                                {item.label}
                              </span>
                              <span className="text-muted-foreground text-xs tabular-nums">
                                {item.count}
                              </span>
                            </ComboboxPrimitive.Item>
                          )}
                        </ComboboxPrimitive.Collection>
                      </ComboboxPrimitive.Group>
                    </React.Fragment>
                  )}
                </ComboboxPrimitive.List>
              </ScrollArea>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </div>
  );
}
