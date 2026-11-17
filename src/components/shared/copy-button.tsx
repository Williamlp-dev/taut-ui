"use client";

import { Check, Copy } from "lucide-react";
import type * as React from "react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string;
  src?: string;
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps): React.ReactElement {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(
              "absolute top-1.5 right-1.5 z-3 size-8 bg-code opacity-70 hover:opacity-100 focus-visible:opacity-100",
              className,
            )}
            data-slot="copy-button"
            onClick={() => copyToClipboard(value)}
            size="icon-xs"
            variant={variant}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <Check className="size-4 text-success" strokeWidth={2} />
            ) : (
              <Copy className="size-4" strokeWidth={2} />
            )}
          </Button>
        }
      />
      <TooltipPopup>{isCopied ? "Copied" : "Copy to Clipboard"}</TooltipPopup>
    </Tooltip>
  );
}
