import { ArrowUpRightIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function Particle() {
  return (
    <Card
      className="w-80"
      render={<button type="button" />}
      ripple
      variant="outlined"
    >
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>
          Install components and configure your theme tokens in minutes.
        </CardDescription>
        <CardAction>
          <ArrowUpRightIcon className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
