import { UsersIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Empty>
      <EmptyMedia>
        <UsersIcon />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No team members</EmptyTitle>
        <EmptyDescription>
          Invite collaborators by email to start working together in this
          workspace.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-nowrap">
        <Input placeholder="name@company.com" type="email" />
        <Button>Invite</Button>
      </EmptyContent>
    </Empty>
  );
}
