import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export default function Particle() {
  return (
    <Card className="w-80" variant="elevated">
      <CardHeader>
        <CardTitle>Storage Usage</CardTitle>
        <CardDescription>14.2 GB of 20 GB used</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Upgrade your plan anytime to unlock unlimited workspace storage.
        </p>
      </CardContent>
    </Card>
  );
}
