"use client";

import { Fragment } from "react";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

interface FoodGroup {
  value: string;
  items: string[];
}

const groups: FoodGroup[] = [
  {
    items: ["Apple", "Banana", "Blueberry", "Mango"],
    value: "Fruits",
  },
  {
    items: ["Broccoli", "Carrot", "Spinach", "Tomato"],
    value: "Vegetables",
  },
];

export default function Particle() {
  return (
    <Autocomplete items={groups}>
      <AutocompleteInput
        className="w-64"
        placeholder="Search foods…"
        showClear
      />
      <AutocompletePopup>
        <AutocompleteEmpty>No results found.</AutocompleteEmpty>
        <AutocompleteList>
          {(group: FoodGroup) => (
            <Fragment key={group.value}>
              <AutocompleteGroup items={group.items}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item: string) => (
                    <AutocompleteItem key={item} value={item}>
                      {item}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            </Fragment>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}
