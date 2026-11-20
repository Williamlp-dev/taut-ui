"use client";

import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Button
      onClick={() =>
        toastManager.add({
          description: "Could not verify webhook signature.",
          title: "Delivery failed",
          type: "error",
        })
      }
      variant="outline"
    >
      Error Toast
    </Button>
  );
}
