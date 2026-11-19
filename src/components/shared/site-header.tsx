import Link from "next/link";
import type * as React from "react";
import { GitHubLink } from "@/components/shared/github-link";
import { Logo } from "@/components/shared/logo";
import { ModeSwitcher } from "@/components/shared/mode-switcher";
import { SiteHeaderDock } from "@/components/shared/site-header-dock";
import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  mobileNav?: React.ReactNode;
  nav?: React.ReactNode;
  children?: React.ReactNode;
  currentProduct?: string;
  className?: string;
}

export function SiteHeader({
  mobileNav,
  nav,
  children,
  className,
}: SiteHeaderProps): React.ReactElement {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-(--header-height) w-full bg-background text-foreground",
        className,
      )}
      data-slot="site-header"
    >
      <div className="container flex h-full w-full items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
          {mobileNav}
          <Link
            aria-label="taut ui home"
            className={cn(
              "inline-flex h-10 shrink-0 items-center justify-center rounded-full px-2 outline-none",
              "transition-opacity duration-120 ease-out hover:opacity-85",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            href="/"
          >
            <Logo aria-hidden="true" className="h-7.5 w-auto text-foreground" />
          </Link>
          {nav ? <div className="ms-1 hidden lg:flex">{nav}</div> : null}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          {children}
          <GitHubLink />
          <ModeSwitcher />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/60"
      />
      <SiteHeaderDock />
    </header>
  );
}
