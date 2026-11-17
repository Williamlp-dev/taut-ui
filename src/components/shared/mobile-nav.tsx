"use client";

import { MenuIcon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";
import { Sheet, SheetPopup, SheetTrigger } from "@/registry/default/ui/sheet";
import { cn } from "@/lib/utils";

export interface PageNode {
  type: "page";
  name: React.ReactNode;
  url: string;
}

export interface FolderNode {
  type: "folder";
  name: React.ReactNode;
  children: NavNode[];
}

export interface SeparatorNode {
  type: "separator";
  name?: React.ReactNode;
}

export type NavNode = PageNode | FolderNode | SeparatorNode;

export interface NavTree {
  children: NavNode[];
}

export interface MobileNavProps {
  tree?: NavTree;
  items: { href: string; label: string }[];
  className?: string;
}

interface MobileNavLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

function MobileNavLink({
  href,
  onSelect,
  className,
  children,
  ...props
}: MobileNavLinkProps): React.ReactElement {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "w-full justify-start px-3",
        !isActive && "text-muted-foreground hover:text-foreground",
        className,
      )}
      morph={false}
      render={<Link href={href} onClick={onSelect} {...props} />}
      size="sm"
      variant={isActive ? "secondary" : "ghost"}
    >
      {children}
    </Button>
  );
}

export function MobileNav({
  tree,
  items,
  className,
}: MobileNavProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const closeSheet = React.useCallback(() => setOpen(false), []);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            aria-label="Toggle Menu"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              className,
            )}
            morph={false}
            size="icon-sm"
            variant="ghost"
          >
            <MenuIcon aria-hidden="true" className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        }
      />
      <SheetPopup
        aria-label="Navigation Menu"
        className="w-72 max-w-[85vw] p-0"
        side="left"
      >
        <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-2">
            <div className="px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Menu
            </div>
            <div className="flex flex-col gap-0.5">
              <MobileNavLink href="/" onSelect={closeSheet}>
                Home
              </MobileNavLink>
              {items.map((item) => (
                <MobileNavLink
                  href={item.href}
                  key={item.href}
                  onSelect={closeSheet}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </div>
          </div>

          {tree?.children?.length ? (
            <div className="flex flex-col gap-6">
              {tree.children.map((group, index) => {
                if (group.type !== "folder") return null;

                return (
                  <div
                    className="flex flex-col gap-2"
                    key={`${String(group.name)}-${index}`}
                  >
                    <div className="px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      {group.name}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {group.children.map((entry) => {
                        if (entry.type !== "page") return null;

                        return (
                          <MobileNavLink
                            href={entry.url}
                            key={entry.url}
                            onSelect={closeSheet}
                          >
                            {entry.name}
                          </MobileNavLink>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </SheetPopup>
    </Sheet>
  );
}
