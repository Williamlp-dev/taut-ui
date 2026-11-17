"use client";

import { Check, Copy, Terminal } from "lucide-react";
import * as React from "react";
import { type PackageManager, useConfig } from "@/hooks/use-config";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export interface CodeBlockCommandProps extends React.ComponentProps<"pre"> {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}

const PACKAGE_MANAGERS: readonly PackageManager[] = [
  "bun",
  "npm",
  "pnpm",
  "yarn",
];

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: CodeBlockCommandProps): React.ReactElement {
  const [config, setConfig] = useConfig();
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const activeManager: PackageManager = config.packageManager || "pnpm";

  const commandsByManager = React.useMemo<
    Record<PackageManager, string | undefined>
  >(
    () => ({
      bun: __bun__,
      npm: __npm__,
      pnpm: __pnpm__,
      yarn: __yarn__,
    }),
    [__bun__, __npm__, __pnpm__, __yarn__],
  );

  const handleCopy = React.useCallback(() => {
    const command = commandsByManager[activeManager];
    if (command) {
      copyToClipboard(command);
    }
  }, [activeManager, commandsByManager, copyToClipboard]);

  return (
    <div className="relative">
      <Tabs
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as PackageManager,
          });
        }}
        value={activeManager}
      >
        <div className="flex items-center gap-2 border-border/64 border-b px-4 py-1.5 font-mono">
          <Terminal className="size-4 text-code-foreground opacity-70" />
          <TabsList className="bg-transparent p-0" variant="default">
            {PACKAGE_MANAGERS.map((manager) => (
              <TabsTab key={manager} value={manager}>
                {manager}
              </TabsTab>
            ))}
          </TabsList>
        </div>
        <ScrollArea className="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2">
          {PACKAGE_MANAGERS.map((manager) => (
            <TabsPanel
              className="mt-0 w-max px-4 py-3.5"
              key={manager}
              value={manager}
            >
              <pre>
                <code
                  className="relative font-mono text-[.8125rem] leading-none"
                  data-language="bash"
                >
                  {commandsByManager[manager]}
                </code>
              </pre>
            </TabsPanel>
          ))}
        </ScrollArea>
      </Tabs>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="absolute top-1.5 right-1.5 z-3 size-8 opacity-70 hover:opacity-100 focus-visible:opacity-100"
              data-slot="copy-button"
              onClick={handleCopy}
              size="icon-xs"
              variant="ghost"
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
    </div>
  );
}
