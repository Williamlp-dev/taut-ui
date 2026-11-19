import { BellIcon } from "lucide-react";
import { Badge, BadgeAnchor } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <BadgeAnchor>
      <Button aria-label="Notifications" size="icon" variant="outline">
        <BellIcon />
      </Button>
      <Badge size="dot" variant="destructive" />
    </BadgeAnchor>
  );
}
