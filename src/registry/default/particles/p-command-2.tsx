"use client";

import { useEffect, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandShortcut,
} from "@/registry/default/ui/command";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

interface Item {
  value: string;
  label: string;
  shortcut: string;
}

const items: Item[] = [
  { label: "New File", shortcut: "⌘N", value: "new-file" },
  { label: "Open Folder", shortcut: "⌘O", value: "open-folder" },
  { label: "Save", shortcut: "⌘S", value: "save" },
  { label: "Toggle Sidebar", shortcut: "⌘B", value: "toggle-sidebar" },
];

export default function Particle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Search
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup aria-label="Command palette">
        <Command items={items}>
          <CommandInput placeholder="Search commands…" />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(item: Item) => (
                <CommandItem
                  key={item.value}
                  onClick={() => setOpen(false)}
                  value={item.value}
                >
                  <span className="flex-1">{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
