"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const QUICK_START_COMMAND = "npx shadcn add @taut-ui/button";

export interface TerminalInstallProps {
  className?: string;
}

export function TerminalInstall({
  className,
}: TerminalInstallProps): React.ReactElement {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className={cn("flex w-full max-w-md flex-col gap-2.5", className)}>
      <span className="select-none ps-1 font-mono font-semibold text-muted-foreground text-xs uppercase tracking-wider">
        Quick start
      </span>

      <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card p-1.5 ps-4 shadow-2xs transition-colors hover:border-border">
        <code className="select-all truncate font-medium font-mono text-foreground text-sm">
          {QUICK_START_COMMAND}
        </code>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label={isCopied ? "Copied" : "Copy command"}
                className="shrink-0 overflow-hidden text-muted-foreground hover:text-foreground"
                morph
                onClick={(event) => {
                  event.stopPropagation();
                  copyToClipboard(QUICK_START_COMMAND);
                }}
                size="icon"
                variant="ghost"
              >
                {isCopied ? (
                  <Check className="size-4 text-primary" strokeWidth={2.5} />
                ) : (
                  <Copy className="size-4" strokeWidth={2} />
                )}
              </Button>
            }
          />
          <TooltipPopup>{isCopied ? "Copied" : "Copy command"}</TooltipPopup>
        </Tooltip>
      </div>

      <p className="ps-1 font-medium text-muted-foreground text-sm leading-6">
        Or point your agent at{" "}
        <Link
          className="font-mono font-semibold text-foreground underline decoration-2 decoration-primary underline-offset-4 transition-colors hover:text-primary"
          href="/llms.txt"
        >
          /llms.txt
        </Link>
      </p>
    </div>
  );
}
