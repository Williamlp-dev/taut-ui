import { Badge } from "@/registry/default/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const deployments = [
  {
    branch: "main",
    commit: "f5eedba",
    duration: "34s",
    env: "Production",
    status: "Ready",
    variant: "success" as const,
  },
  {
    branch: "feat/table-card",
    commit: "8a2a43d",
    duration: "28s",
    env: "Preview",
    status: "Building",
    variant: "warning" as const,
  },
  {
    branch: "fix/edge-cache",
    commit: "a887b08",
    duration: "19s",
    env: "Preview",
    status: "Failed",
    variant: "error" as const,
  },
];

export default function Particle() {
  return (
    <Table variant="card">
      <TableHeader>
        <TableRow>
          <TableHead>Environment</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((item) => (
          <TableRow key={item.commit}>
            <TableCell className="font-medium">{item.env}</TableCell>
            <TableCell className="font-mono text-muted-foreground text-xs">
              {item.branch} ({item.commit})
            </TableCell>
            <TableCell>
              <Badge size="sm" variant={item.variant}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-mono text-muted-foreground">
              {item.duration}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
