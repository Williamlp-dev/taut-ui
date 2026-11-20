import { Card } from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";

const items = [
  { description: "Manage your personal details", title: "Account" },
  { description: "Configure alerts and digests", title: "Notifications" },
  { description: "Manage active sessions and keys", title: "Security" },
];

export default function Particle() {
  return (
    <Card className="w-72 py-1">
      {items.map((item, index) => (
        <div key={item.title}>
          <div className="px-4 py-3">
            <p className="font-medium text-foreground text-sm">{item.title}</p>
            <p className="text-muted-foreground text-xs">{item.description}</p>
          </div>
          {index < items.length - 1 && <Separator inset="both" />}
        </div>
      ))}
    </Card>
  );
}
