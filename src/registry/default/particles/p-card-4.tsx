import { ArrowRightIcon, FolderIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function Particle() {
  return (
    <Card className="w-80" orientation="horizontal" variant="filled">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-card text-foreground">
        <FolderIcon className="size-5" />
      </div>
      <CardHeader>
        <CardTitle>Design Assets</CardTitle>
        <CardDescription>24 files · Updated 2h ago</CardDescription>
        <CardAction>
          <Button aria-label="Open folder" size="icon-sm" variant="ghost">
            <ArrowRightIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
