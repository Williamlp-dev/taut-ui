"use client";

import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Button
      onClick={() => {
        toastManager.promise(
          new Promise<string>((resolve) =>
            setTimeout(() => resolve("v2.4.0"), 1800),
          ),
          {
            error: "Build failed",
            loading: {
              description: "Compiling assets and running checks...",
              title: "Publishing release",
            },
            success: (version) => ({
              description: `Release ${version} is now available.`,
              title: "Release published",
            }),
          },
        );
      }}
      variant="outline"
    >
      Run Promise Toast
    </Button>
  );
}
