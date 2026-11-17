"use client";

import { CheckIcon } from "lucide-react";
import type * as React from "react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

export interface CopyRegistryProps extends React.ComponentProps<typeof Button> {
  value: string;
}

export function CopyRegistry({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyRegistryProps): React.ReactElement {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(className)}
            data-slot="copy-button"
            onClick={() => copyToClipboard(value)}
            size="icon-sm"
            variant={variant}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <CheckIcon className="size-3.5 text-success" strokeWidth={2} />
            ) : (
              <Icons.mcp className="size-4" />
            )}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy Registry URL"}</TooltipPopup>
    </Tooltip>
  );
}
