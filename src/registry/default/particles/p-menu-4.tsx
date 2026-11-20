"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  const [statusBar, setStatusBar] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">View Options</Button>} />
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Panels</MenuGroupLabel>
          <MenuCheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
            Status bar
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={lineNumbers}
            onCheckedChange={setLineNumbers}
          >
            Line numbers
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuCheckboxItem
          checked={wordWrap}
          onCheckedChange={setWordWrap}
          variant="switch"
        >
          Word wrap
        </MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  );
}
