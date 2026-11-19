"use client";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

const commands = [
  "git status",
  "git commit",
  "git push",
  "git pull",
  "git checkout",
  "git branch",
];

export default function Particle() {
  return (
    <Autocomplete items={commands} openOnCtrlSpace>
      <AutocompleteInput
        className="w-64"
        placeholder="Press Ctrl+Space…"
        showClear
      />
      <AutocompletePopup>
        <AutocompleteEmpty>No commands found.</AutocompleteEmpty>
        <AutocompleteList>
          {(cmd: string) => (
            <AutocompleteItem key={cmd} value={cmd}>
              {cmd}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}
