"use client";

import { CopyIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/registry/default/ui/button";
import { anchoredToastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Button
      onClick={() =>
        anchoredToastManager.add({
          data: { tooltipStyle: true },
          positionerProps: { anchor: buttonRef.current, sideOffset: 8 },
          timeout: 1800,
          title: "Copied to clipboard",
        })
      }
      ref={buttonRef}
      variant="outline"
    >
      <CopyIcon />
      Copy Token
    </Button>
  );
}
