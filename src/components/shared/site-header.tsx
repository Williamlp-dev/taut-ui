import Link from "next/link";
import type * as React from "react";
import { GitHubLink } from "@/components/shared/github-link";
import { Logo } from "@/components/shared/logo";
import { ModeSwitcher } from "@/components/shared/mode-switcher";
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
        "sticky top-0 z-40 w-full pt-3 pb-1",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-7 before:bg-gradient-to-b before:from-sidebar/90 before:to-transparent",
        className,
      )}
      data-slot="site-header"
    >
      <div className="container relative w-full">
        <div
          className={cn(
            "flex h-14 w-full items-center justify-between gap-3 rounded-3xl p-2 ps-3",
            "bg-card/88 text-foreground backdrop-blur-md",
            "shadow-[0_0_0_1px_var(--border),0_1px_2px_oklch(0_0_0/0.05),0_12px_28px_-20px_oklch(0_0_0/0.35)]",
          )}
        >
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
            {mobileNav}
            <Link
              aria-label="taut ui home"
              className={cn(
                "inline-flex h-10 shrink-0 items-center justify-center rounded-full px-2 outline-none",
                "transition-opacity duration-120 ease-out hover:opacity-85",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
              )}
              href="/"
            >
              <Logo
                aria-hidden="true"
                className="h-7.5 w-auto text-foreground"
              />
            </Link>
            {nav ? <div className="ms-1 hidden lg:flex">{nav}</div> : null}
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            {children}
            <GitHubLink />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
