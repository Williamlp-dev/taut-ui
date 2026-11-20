"use client";

import { useState } from "react";
import { Card } from "@/registry/default/ui/card";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Card className="w-80 flex-row items-center justify-between gap-4 p-4">
      <div className="space-y-0.5">
        <p className="font-medium text-foreground text-sm">Auto-save</p>
        <p className="text-muted-foreground text-xs">
          Automatically persist changes as you edit.
        </p>
      </div>
      <Switch
        aria-label="Auto-save"
        checked={enabled}
        icons="checked"
        onCheckedChange={setEnabled}
      />
    </Card>
  );
}
