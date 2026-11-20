import { Card } from "@/registry/default/ui/card";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const columns = ["Token", "Light", "Dark", "Taut", "Role"];

const rows = [
  ["--background", "#ffffff", "#121212", "oklch(0.19)", "Page canvas"],
  ["--foreground", "#262626", "#f5f5f5", "oklch(0.914)", "Primary text"],
  ["--card", "#ffffff", "#171717", "oklch(0.242)", "Surface low"],
  ["--popover", "#ffffff", "#1c1c1c", "oklch(0.284)", "Floating surface"],
  ["--primary", "#262626", "#f5f5f5", "oklch(0.827)", "Brand accent"],
  ["--secondary", "4% black", "4% white", "oklch(0.397)", "Tonal fill"],
  ["--muted", "4% black", "4% white", "oklch(0.284)", "Subtle surface"],
  ["--accent", "4% black", "4% white", "oklch(0.328)", "Hover surface"],
  [
    "--destructive",
    "oklch(0.55)",
    "oklch(0.58)",
    "oklch(0.838)",
    "Danger state",
  ],
  ["--ring", "#a3a3a3", "#737373", "oklch(0.827)", "Focus outline"],
];

export default function Particle() {
  return (
    <Card className="h-60 w-80 overflow-hidden">
      <ScrollArea overscrollContain>
        <div className="w-max p-4">
          <div className="grid grid-cols-[9rem_6.5rem_6.5rem_7.5rem_8rem] gap-3 pb-2 font-medium text-foreground text-xs">
            {columns.map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>
          <div className="flex flex-col divide-y divide-border">
            {rows.map((row) => (
              <div
                className="grid grid-cols-[9rem_6.5rem_6.5rem_7.5rem_8rem] gap-3 py-2 text-muted-foreground text-xs"
                key={row[0]}
              >
                <span className="font-mono text-foreground">{row[0]}</span>
                <span className="font-mono">{row[1]}</span>
                <span className="font-mono">{row[2]}</span>
                <span className="font-mono">{row[3]}</span>
                <span>{row[4]}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
