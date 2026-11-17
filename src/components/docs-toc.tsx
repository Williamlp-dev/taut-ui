"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { TOCProvider, TOCScrollArea } from "fumadocs-ui/components/toc";
import { TOCEmpty, TOCItem, TOCItems } from "fumadocs-ui/components/toc/clerk";
import { Text } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

export interface DocsTableOfContentsProps {
  toc: TOCItemType[];
  className?: string;
}

export function DocsTableOfContents({
  toc,
  className,
}: DocsTableOfContentsProps): React.ReactElement | null {
  if (!toc?.length) return null;

  return (
    <TOCProvider toc={toc}>
      <div
        className={cn(
          "z-10 flex min-h-0 flex-1 flex-col gap-1 py-2 ps-6 pe-4 text-sm",
          className,
        )}
      >
        <h3
          className="inline-flex h-7 items-center gap-1.5 font-medium text-muted-foreground text-xs"
          id="toc-title"
        >
          <Text aria-hidden="true" className="size-3.5" />
          On this page
        </h3>
        <TOCScrollArea className="ms-px">
          <TOCItems>
            {toc.length === 0 ? <TOCEmpty /> : null}
            {toc.map((item) => (
              <TOCItem item={item} key={item.url} />
            ))}
          </TOCItems>
        </TOCScrollArea>
      </div>
    </TOCProvider>
  );
}
