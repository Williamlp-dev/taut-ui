import { PlusIcon } from "lucide-react";
import type React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle(): React.ReactElement {
  return (
    <Button aria-label="Add item" size="icon">
      <PlusIcon aria-hidden="true" />
    </Button>
  );
}
