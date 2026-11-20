import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

export default function Particle() {
  return (
    <Tabs className="w-80 max-w-full items-center" defaultValue="general">
      <TabsList variant="underline">
        <TabsTab value="general">General</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
        <TabsTab value="team">Team</TabsTab>
      </TabsList>
      <TabsPanel className="min-h-14 pt-3 text-center" value="general">
        <p className="text-muted-foreground text-sm">
          Update workspace name, logo, and locale.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-3 text-center" value="billing">
        <p className="text-muted-foreground text-sm">
          View invoices, cards, and usage limits.
        </p>
      </TabsPanel>
      <TabsPanel className="min-h-14 pt-3 text-center" value="team">
        <p className="text-muted-foreground text-sm">
          Manage roles, access, and invitations.
        </p>
      </TabsPanel>
    </Tabs>
  );
}
