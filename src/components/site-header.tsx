import type * as React from "react";
import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/shared/mobile-nav";
import { SiteHeader as BaseSiteHeader } from "@/components/shared/site-header";
import { appConfig } from "@/lib/config";
import { source } from "@/lib/source";
import { Separator } from "@/registry/default/ui/separator";

export function SiteHeader(): React.ReactElement {
  const pageTree = source.pageTree;

  return (
    <BaseSiteHeader
      currentProduct="ui"
      mobileNav={
        <MobileNav
          className="flex lg:hidden"
          items={appConfig.navItems}
          tree={pageTree}
        />
      }
      nav={<MainNav items={appConfig.navItems} />}
    >
      <CommandMenu navItems={appConfig.navItems} tree={pageTree} />
      <Separator className="mx-1 h-5 max-md:hidden" orientation="vertical" />
    </BaseSiteHeader>
  );
}
