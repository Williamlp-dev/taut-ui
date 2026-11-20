import { CompassIcon, FlameIcon, SparklesIcon } from "lucide-react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="w-80 max-w-full" defaultValue="explore">
      <TabsList stacked variant="primary">
        <TabsTab value="explore">
          <CompassIcon />
          Explore
        </TabsTab>
        <TabsTab value="trending">
          <FlameIcon />
          Trending
        </TabsTab>
        <TabsTab value="for-you">
          <SparklesIcon />
          For you
        </TabsTab>
      </TabsList>
      <TabsPanel className="min-h-14 pt-3 text-center" value="explore">
        <p className="text-muted-foreground text-sm">
          Curated collections and new releases.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-3 text-center" value="trending">
        <p className="text-muted-foreground text-sm">
          Most popular picks across the community.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-3 text-center" value="for-you">
        <p className="text-muted-foreground text-sm">
          Personalized picks from recent activity.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
