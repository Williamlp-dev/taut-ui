"use client";

import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Button
      onClick={() =>
        toastManager.add({
          description: "Your deployment is now live on gru1.",
          title: "Deployment succeeded",
          type: "success",
        })
      }
      variant="outline"
    >
      Success Toast
    </Button>
  );
}
