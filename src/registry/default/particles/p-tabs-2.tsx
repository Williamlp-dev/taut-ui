import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="w-80 max-w-full items-center" defaultValue="overview">
      <TabsList variant="pill">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="analytics">Analytics</TabsTab>
        <TabsTab value="reports">Reports</TabsTab>
      </TabsList>
      <TabsPanel className="min-h-14 pt-2 text-center" value="overview">
        <p className="text-muted-foreground text-sm">
          Summary of workspace activity and metrics.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-2 text-center" value="analytics">
        <p className="text-muted-foreground text-sm">
          Traffic trends, funnels, and retention.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-2 text-center" value="reports">
        <p className="text-muted-foreground text-sm">
          Monthly exports and scheduled summaries.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
