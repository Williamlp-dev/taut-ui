import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function Particle() {
  return (
    <Card className="w-80" variant="outlined">
      <CardHeader>
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription>Billed monthly</CardDescription>
        <CardAction>
          <Badge variant="success">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Includes priority support, custom domains, and team analytics.
        </p>
      </CardContent>
    </Card>
  );
}
