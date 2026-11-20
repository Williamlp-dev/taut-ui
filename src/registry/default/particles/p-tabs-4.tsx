import { BookmarkIcon, CompassIcon, FlameIcon } from "lucide-react";
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
        <TabsTab value="saved">
          <BookmarkIcon />
          Saved
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
      <TabsPanel className="min-h-14 pt-3 text-center" value="saved">
        <p className="text-muted-foreground text-sm">
          Bookmarked items from your recent activity.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
