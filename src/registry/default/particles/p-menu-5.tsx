"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  const [density, setDensity] = useState("comfortable");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Density</Button>} />
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Display density</MenuGroupLabel>
          <MenuRadioGroup onValueChange={setDensity} value={density}>
            <MenuRadioItem value="compact">Compact</MenuRadioItem>
            <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
            <MenuRadioItem value="spacious">Spacious</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
