"use client";

import { KeyRoundIcon, ShieldIcon, SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/registry/default/ui/sidebar";

const items = [
  { icon: SlidersHorizontalIcon, id: "general", title: "General" },
  { icon: ShieldIcon, id: "security", title: "Security" },
  { icon: KeyRoundIcon, id: "tokens", title: "API Tokens" },
];

export default function Particle() {
  const [active, setActive] = useState("general");

  return (
    <SidebarProvider className="min-h-0 w-64">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Preferences</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active === item.id}
                      morph={false}
                      onClick={() => setActive(item.id)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
