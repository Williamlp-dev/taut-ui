import { SearchXIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Card } from "@/registry/default/ui/card";
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
    <Card className="w-full max-w-md">
      <Empty className="py-10">
        <EmptyMedia>
          <SearchXIcon />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No matching results</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search query or clearing active filters.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" variant="outline">
            Clear filters
          </Button>
        </EmptyContent>
      </Empty>
    </Card>
  );
}
