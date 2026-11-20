import { Badge } from "@/registry/default/ui/badge";
import { Card } from "@/registry/default/ui/card";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const endpoints = [
  { method: "GET", path: "/api/projects", status: "200" },
  { method: "POST", path: "/api/deployments", status: "201" },
  { method: "GET", path: "/api/tokens", status: "200" },
  { method: "PATCH", path: "/api/settings", status: "200" },
  { method: "DELETE", path: "/api/sessions", status: "204" },
  { method: "GET", path: "/api/members", status: "200" },
  { method: "POST", path: "/api/invites", status: "201" },
  { method: "GET", path: "/api/webhooks", status: "200" },
  { method: "GET", path: "/api/audit-logs", status: "200" },
];

export default function Particle() {
  return (
    <Card className="h-56 w-80 overflow-hidden">
      <ScrollArea overscrollContain scrollbarGutter>
        <div className="flex flex-col gap-1 p-3">
          {endpoints.map((ep) => (
            <div
              className="flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-xs"
              key={`${ep.method}-${ep.path}`}
            >
              <span className="truncate font-mono text-foreground">
                <span className="me-2 text-muted-foreground">{ep.method}</span>
                {ep.path}
              </span>
              <Badge size="sm" variant="success">
                {ep.status}
              </Badge>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
