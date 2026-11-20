"use client";

import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Button
      onClick={() => {
        const id = toastManager.add({
          actionProps: {
            children: "Undo",
            onClick: () => toastManager.close(id),
          },
          description: "Moved to trash. You can restore it within 30 days.",
          title: "Project archived",
        });
      }}
      variant="outline"
    >
      Toast with Action
    </Button>
  );
}
