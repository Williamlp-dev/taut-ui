import { ScrollArea } from "@/registry/default/ui/scroll-area";

const items = [
  { label: "Surface", value: "01" },
  { label: "Motion", value: "02" },
  { label: "Shape", value: "03" },
  { label: "Color", value: "04" },
  { label: "Type", value: "05" },
  { label: "Depth", value: "06" },
  { label: "Focus", value: "07" },
];

export default function Particle() {
  return (
    <div className="w-80">
      <ScrollArea overscrollContain>
        <div className="flex w-max gap-3 py-1">
          {items.map((item) => (
            <div
              className="flex h-24 w-28 shrink-0 flex-col justify-between rounded-2xl bg-muted p-3.5 dark:bg-card"
              key={item.value}
            >
              <span className="font-mono text-muted-foreground text-xs">
                {item.value}
              </span>
              <span className="font-medium text-foreground text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
