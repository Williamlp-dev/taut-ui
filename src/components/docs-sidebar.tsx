"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { PAGES_NEW } from "@/lib/docs";
import type { source } from "@/lib/source";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/default/ui/sidebar";

export type DocsSidebarProps = React.ComponentProps<typeof Sidebar> & {
  tree: typeof source.pageTree;
};

export function DocsSidebar({
  tree,
  ...props
}: DocsSidebarProps): React.ReactElement {
  const pathname = usePathname();

  return (
    <Sidebar
      className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="py-2 ps-4 pe-2.5">
        <div className="h-(--top-spacing) shrink-0" />
        {tree.children.map((node, index) => (
          <SidebarGroup
            className="gap-1"
            key={node.$id ?? String(node.name ?? index)}
          >
            <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
              {node.name}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {node.type === "folder" ? (
                <SidebarMenu className="gap-0.5">
                  {node.children.map((entry) => {
                    if (entry.type !== "page") return null;
                    const isNew =
                      PAGES_NEW.length > 0 && PAGES_NEW.includes(entry.url);

                    return (
                      <SidebarMenuItem key={entry.url}>
                        <SidebarMenuButton
                          className="ps-3.5"
                          isActive={entry.url === pathname}
                          render={<Link href={entry.url} />}
                        >
                          {entry.name}
                          {isNew ? (
                            <span className="ms-auto inline-flex h-5 items-center rounded-full bg-primary px-2 font-medium text-primary-foreground text-xs">
                              New
                            </span>
                          ) : null}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              ) : null}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
