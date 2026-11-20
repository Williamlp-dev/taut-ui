import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs defaultValue="system">
      <TabsList variant="circular">
        <TabsTab aria-label="Light theme" value="light">
          <SunIcon />
        </TabsTab>
        <TabsTab aria-label="Dark theme" value="dark">
          <MoonIcon />
        </TabsTab>
        <TabsTab aria-label="System theme" value="system">
          <MonitorIcon />
        </TabsTab>
      </TabsList>
    </Tabs>
  );
}
