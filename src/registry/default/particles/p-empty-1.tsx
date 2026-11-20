import { InboxIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export default function Particle() {
  return (
    <Empty>
      <EmptyMedia>
        <InboxIcon />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          When you receive messages, they will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Compose message</Button>
      </EmptyContent>
    </Empty>
  );
}
