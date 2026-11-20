import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="w-80 max-w-full items-center" defaultValue="account">
      <TabsList>
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel className="min-h-14 pt-2 text-center" value="account">
        <p className="text-muted-foreground text-sm">
          Manage your account and preferences.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-2 text-center" value="password">
        <p className="text-muted-foreground text-sm">
          Update your password and security.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-2 text-center" value="settings">
        <p className="text-muted-foreground text-sm">
          Configure your workspace settings.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
