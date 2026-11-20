import { FolderPlusIcon } from "lucide-react";
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
      <EmptyMedia variant="vibrant">
        <FolderPlusIcon />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create your first project to organize components, themes, and team
          releases.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>New project</Button>
        <Button variant="ghost">Import repository</Button>
      </EmptyContent>
    </Empty>
  );
}
