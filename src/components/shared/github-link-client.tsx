"use client";

import Link from "next/link";
import type * as React from "react";
import { Button } from "@/registry/default/ui/button";
import { Icons } from "@/components/shared/icons";
import { appConfig } from "@/lib/config";

export interface GitHubLinkClientProps {
  stars?: React.ReactNode;
}

export function GitHubLinkClient({
  stars,
}: GitHubLinkClientProps): React.ReactElement {
  return (
    <Button
      aria-label="GitHub repository"
      className="px-3 text-muted-foreground hover:text-foreground max-sm:w-10 max-sm:px-0"
      morph={false}
      render={
        <Link href={appConfig.links.github} rel="noreferrer" target="_blank" />
      }
      size="sm"
      variant="ghost"
    >
      <Icons.github aria-hidden="true" className="size-4.5" />
      <span className="font-medium text-xs tabular-nums empty:hidden max-sm:sr-only">
        {stars}
      </span>
    </Button>
  );
}
