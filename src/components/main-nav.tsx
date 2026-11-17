"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { Button } from "@/registry/default/ui/button";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
}

export interface MainNavProps extends React.ComponentProps<"nav"> {
  items: NavItem[];
}

export function MainNav({
  items,
  className,
  ...props
}: MainNavProps): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={cn("flex items-center gap-1", className)}
      data-slot="main-nav"
      {...props}
    >
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Button
            aria-current={isActive ? "page" : undefined}
            className={cn(
              !isActive && "text-muted-foreground hover:text-foreground",
            )}
            key={item.href}
            morph={false}
            render={<Link href={item.href} />}
            size="sm"
            variant={isActive ? "secondary" : "ghost"}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}
