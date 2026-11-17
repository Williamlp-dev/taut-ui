"use client";

import type * as React from "react";
import { type InstallationType, useConfig } from "@/hooks/use-config";
import { Tabs } from "@/registry/default/ui/tabs";

export function CodeTabs({
  children,
}: React.ComponentProps<typeof Tabs>): React.ReactElement {
  const [config, setConfig] = useConfig();
  const activeMode: InstallationType = config.installationType || "cli";

  return (
    <Tabs
      className="relative mt-6 w-full"
      onValueChange={(value) => {
        setConfig({
          ...config,
          installationType: value as InstallationType,
        });
      }}
      value={activeMode}
    >
      {children}
    </Tabs>
  );
}
