"use client";

import { Atom, BookOpen, CornerDownLeft, Search } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import * as React from "react";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@/registry/default/ui/command";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import type { source } from "@/lib/source";
import { type PackageManager, useConfig } from "@/hooks/use-config";
import { useIsMac } from "@/hooks/use-is-mac";

interface CommandEntry {
  value: string;
  label: string;
  url: string;
  isComponent: boolean;
  keywords?: string[];
}

interface CommandSection {
  value: string;
  items: CommandEntry[];
}

function buildInstallCommand(
  packageManager: PackageManager,
  componentSlug: string,
): string {
  const target = `@taut-ui/${componentSlug}`;
  switch (packageManager) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${target}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${target}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${target}`;
    default:
      return `npx shadcn@latest add ${target}`;
  }
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

export type CommandMenuProps = ComponentProps<typeof CommandDialog> & {
  tree: typeof source.pageTree;
  navItems?: { href: string; label: string }[];
};

export function CommandMenu({
  tree,
  navItems,
  ...props
}: CommandMenuProps): React.ReactElement {
  const isMac = useIsMac();
  const [config] = useConfig();
  const { copyToClipboard } = useCopyToClipboard();
  const [open, setOpen] = React.useState(false);
  const [highlightedKind, setHighlightedKind] = React.useState<
    "page" | "component" | null
  >(null);
  const [installSnippet, setInstallSnippet] = React.useState("");
  const packageManager: PackageManager = config.packageManager || "pnpm";

  const sections = React.useMemo<CommandSection[]>(() => {
    const result: CommandSection[] = [];

    if (navItems && navItems.length > 0) {
      result.push({
        items: navItems.map((item) => ({
          isComponent: false,
          keywords: ["nav", "navigation", item.label.toLowerCase()],
          label: item.label,
          url: item.href,
          value: `Navigation ${item.label}`,
        })),
        value: "Pages",
      });
    }

    for (const folder of tree.children) {
      if (folder.type !== "folder") continue;

      const entries: CommandEntry[] = [];
      for (const child of folder.children) {
        if (child.type !== "page") continue;
        const isComponent = child.url.includes("/components/");
        const label = child.name?.toString() || "";
        entries.push({
          isComponent,
          keywords: isComponent ? ["component"] : undefined,
          label,
          url: child.url,
          value: label ? `${folder.name} ${label}` : "",
        });
      }

      if (entries.length > 0) {
        result.push({
          items: entries,
          value:
            typeof folder.name === "string" ? folder.name : String(folder.name),
        });
      }
    }

    return result;
  }, [tree, navItems]);

  const handleHighlight = React.useCallback(
    (entry: CommandEntry) => {
      if (entry.isComponent) {
        const slug = entry.url.split("/").pop() ?? "";
        setHighlightedKind("component");
        setInstallSnippet(buildInstallCommand(packageManager, slug));
      } else {
        setHighlightedKind("page");
        setInstallSnippet("");
      }
    },
    [packageManager],
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        event.key === "/"
      ) {
        if (isEditableElement(event.target)) return;
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (
        event.key === "c" &&
        (event.metaKey || event.ctrlKey) &&
        highlightedKind === "component" &&
        installSnippet
      ) {
        event.preventDefault();
        copyToClipboard(installSnippet);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [copyToClipboard, highlightedKind, installSnippet]);

  const modifierSymbol = isMac ? "⌘" : "Ctrl";

  return (
    <CommandDialog onOpenChange={setOpen} open={open} {...props}>
      <CommandDialogTrigger
        render={
          <Button
            aria-label="Search documentation"
            className="gap-2 bg-secondary/60 px-3 text-muted-foreground hover:bg-secondary hover:text-foreground max-md:w-9 max-md:px-0"
            morph={false}
            size="sm"
            variant="ghost"
          />
        }
      >
        <Search aria-hidden="true" className="size-4 shrink-0" />
        <span className="hidden font-normal text-xs md:inline-block">
          Search…
        </span>
        <KbdGroup className="hidden md:inline-flex">
          <Kbd>{modifierSymbol}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command
          items={sections}
          onItemHighlighted={(highlighted) => {
            const entry = highlighted as CommandEntry | null;
            if (entry) {
              handleHighlight(entry);
            }
          }}
        >
          <CommandInput placeholder="Search documentation…" />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(section: CommandSection) => (
                <CommandGroup items={section.items} key={section.value}>
                  <CommandGroupLabel>{section.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(entry: CommandEntry) => (
                      <CommandItem
                        className="flex w-full items-center"
                        key={entry.value}
                        render={
                          <Link
                            href={entry.url}
                            onNavigate={() => setOpen(false)}
                          />
                        }
                      >
                        {entry.isComponent ? (
                          <Atom className="mr-2 size-4 opacity-80" />
                        ) : (
                          <BookOpen className="mr-2 size-4 opacity-80" />
                        )}
                        <span className="flex-1">{entry.label}</span>
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap">Go to Page</span>
              <Kbd>
                <CornerDownLeft className="size-3" />
              </Kbd>
            </div>
            {installSnippet ? (
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-mono">{installSnippet}</span>
                <KbdGroup>
                  <Kbd>{modifierSymbol}</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </div>
            ) : null}
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
