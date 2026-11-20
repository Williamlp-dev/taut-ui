import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="w-72 max-w-full" defaultValue="all">
      <TabsList variant="dot">
        <TabsTab value="all">All</TabsTab>
        <TabsTab value="unread">Unread</TabsTab>
        <TabsTab value="archived">Archived</TabsTab>
      </TabsList>
      <TabsPanel className="min-h-14 pt-3 text-center" value="all">
        <p className="text-muted-foreground text-sm">
          Showing all 24 conversations.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-3 text-center" value="unread">
        <p className="text-muted-foreground text-sm">
          3 unread messages waiting for review.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-3 text-center" value="archived">
        <p className="text-muted-foreground text-sm">
          Archived threads kept for 90 days.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
