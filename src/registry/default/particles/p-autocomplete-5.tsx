"use client";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

const languages = ["TypeScript", "JavaScript", "Rust", "Go", "Python"];

export default function Particle() {
  return (
    <Autocomplete items={languages}>
      <AutocompleteInput
        className="w-64"
        placeholder="Search language…"
        size="lg"
      />
      <AutocompletePopup>
        <AutocompleteEmpty>No results found.</AutocompleteEmpty>
        <AutocompleteList>
          {(lang: string) => (
            <AutocompleteItem key={lang} value={lang}>
              {lang}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}
