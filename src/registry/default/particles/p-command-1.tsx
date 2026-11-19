"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/registry/default/ui/command";

interface Item {
  value: string;
  label: string;
}

interface Group {
  value: string;
  items: Item[];
}

const groups: Group[] = [
  {
    items: [
      { label: "Calendar", value: "calendar" },
      { label: "Search Emoji", value: "search-emoji" },
      { label: "Calculator", value: "calculator" },
    ],
    value: "Suggestions",
  },
  {
    items: [
      { label: "Profile", value: "profile" },
      { label: "Billing", value: "billing" },
      { label: "Settings", value: "settings" },
    ],
    value: "Account",
  },
];

export default function Particle() {
  const [open, setOpen] = useState(false);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Open Command
      </CommandDialogTrigger>
      <CommandDialogPopup aria-label="Command palette">
        <Command items={groups}>
          <CommandInput placeholder="Type a command or search…" />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: Group) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: Item) => (
                      <CommandItem
                        key={item.value}
                        onClick={() => setOpen(false)}
                        value={item.value}
                      >
                        {item.label}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
