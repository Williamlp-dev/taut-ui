"use client";

import { SearchIcon } from "lucide-react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

const frameworks = [
  "Next.js",
  "Remix",
  "Astro",
  "Vite",
  "Nuxt",
  "SvelteKit",
  "SolidStart",
];

export default function Particle() {
  return (
    <Autocomplete items={frameworks}>
      <AutocompleteInput
        className="w-64"
        placeholder="Select framework…"
        showClear
        showTrigger
        startAddon={<SearchIcon />}
      />
      <AutocompletePopup>
        <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
        <AutocompleteList>
          {(framework: string) => (
            <AutocompleteItem key={framework} value={framework}>
              {framework}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}
