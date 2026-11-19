import { InboxIcon } from "lucide-react";
import { Badge, BadgeAnchor } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <BadgeAnchor>
      <Button aria-label="Inbox" size="icon" variant="outline">
        <InboxIcon />
      </Button>
      <Badge size="sm" variant="destructive">
        12
      </Badge>
    </BadgeAnchor>
  );
}
