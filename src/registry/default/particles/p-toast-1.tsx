"use client";

import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Button
      onClick={() =>
        toastManager.add({
          description: "Friday, November 20 at 4:00 PM",
          title: "Event scheduled",
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}
