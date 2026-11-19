import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function Particle() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project Update</CardTitle>
        <CardDescription>
          Your project has been successfully deployed to production.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          All 42 tests passed. Build time: 1m 23s.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">View Details</Button>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  );
}
