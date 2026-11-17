"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

const THEME_OPTIONS = [
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
  { icon: MonitorIcon, label: "System", value: "system" },
] as const;

export function ModeSwitcher(): React.ReactElement {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (theme ?? "system") : "system";
  const ActiveIcon =
    THEME_OPTIONS.find((item) => item.value === activeTheme)?.icon ??
    MonitorIcon;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground"
            morph={false}
            size="icon-sm"
            title="Toggle theme (Light, Dark, System)"
            variant="ghost"
          />
        }
      >
        <ActiveIcon aria-hidden="true" className="size-4.5" />
        <span className="sr-only">Toggle theme</span>
      </PopoverTrigger>
      <PopoverPopup align="end" className="w-auto rounded-full p-1 shadow-md">
        <Tabs
          onValueChange={(value) => {
            if (value) setTheme(value);
          }}
          value={activeTheme}
        >
          <TabsList
            aria-label="Theme selection"
            className="border-none bg-transparent p-0"
            variant="circular"
          >
            {THEME_OPTIONS.map(({ icon: Icon, label, value }) => (
              <TabsTab
                aria-label={`${label} theme`}
                className="size-8 px-0"
                key={value}
                title={label}
                value={value}
              >
                <Icon aria-hidden="true" className="size-4" />
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      </PopoverPopup>
    </Popover>
  );
}
