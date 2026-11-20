"use client";

import {
  ActivityIcon,
  BoxIcon,
  FolderGit2Icon,
  ServerIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
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

const platformItems = [
  { badge: "Live", icon: ActivityIcon, id: "monitoring", title: "Monitoring" },
  { badge: "12", icon: BoxIcon, id: "deployments", title: "Deployments" },
];

const infraItems = [
  { icon: ServerIcon, id: "clusters", title: "Edge clusters" },
  { icon: FolderGit2Icon, id: "repos", title: "Repositories" },
];

export default function Particle() {
  const [active, setActive] = useState("monitoring");

  return (
    <SidebarProvider className="min-h-0 w-64">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {platformItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active === item.id}
                      onClick={() => setActive(item.id)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                      <Badge className="ms-auto" size="sm" variant="secondary">
                        {item.badge}
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Infrastructure</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {infraItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active === item.id}
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
