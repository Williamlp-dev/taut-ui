import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs
      className="w-80 max-w-full"
      defaultValue="profile"
      orientation="vertical"
    >
      <TabsList variant="underline">
        <TabsTab value="profile">Profile</TabsTab>
        <TabsTab value="security">Security</TabsTab>
        <TabsTab value="api">API Keys</TabsTab>
      </TabsList>
      <TabsPanel className="py-1" value="profile">
        <p className="text-muted-foreground text-sm">
          Edit your display name, avatar, and public bio.
        </p>
      </TabsPanel>
      <TabsPanel className="py-1" value="security">
        <p className="text-muted-foreground text-sm">
          Configure two-factor auth and recovery codes.
        </p>
      </TabsPanel>
      <TabsPanel className="py-1" value="api">
        <p className="text-muted-foreground text-sm">
          Create and revoke personal access tokens.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
