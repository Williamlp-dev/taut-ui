import { BellIcon, ShieldIcon, UserIcon } from "lucide-react";
import { Card } from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";

const items = [
  { icon: UserIcon, label: "Profile" },
  { icon: BellIcon, label: "Notifications" },
  { icon: ShieldIcon, label: "Privacy & Security" },
];

export default function Particle() {
  return (
    <Card className="w-72 py-1">
      {items.map((item, index) => (
        <div key={item.label}>
          <div className="flex items-center gap-3 px-4 py-3 text-foreground text-sm">
            <item.icon className="size-4 shrink-0 text-muted-foreground" />
            <span>{item.label}</span>
          </div>
          {index < items.length - 1 && <Separator inset="start" />}
        </div>
      ))}
    </Card>
  );
}
