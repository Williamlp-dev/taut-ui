"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const themes = [
  { icon: MonitorIcon, label: "System", value: "system" },
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
] as const;

export default function Particle() {
  return (
    <Select defaultValue="system" items={themes}>
      <SelectTrigger aria-label="Theme" className="w-full max-w-52">
        <SelectValue>
          {(value: string | null) => {
            const selected = themes.find((t) => t.value === value);
            if (!selected) return "Select theme";
            const Icon = selected.icon;
            return (
              <>
                <Icon />
                <span>{selected.label}</span>
              </>
            );
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectPopup colorScheme="vibrant">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <SelectItem key={theme.value} value={theme.value}>
              <Icon />
              <span>{theme.label}</span>
            </SelectItem>
          );
        })}
      </SelectPopup>
    </Select>
  );
}
