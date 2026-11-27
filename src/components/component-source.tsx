import fs from "node:fs/promises";
import path from "node:path";
import type * as React from "react";
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { CodeBlock } from "@/components/shared/code-block";
import { getRegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";

export interface ComponentSourceProps extends React.ComponentProps<"div"> {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: ComponentSourceProps) {
  if (!name && !src) return null;

  let sourceCode: string | undefined;

  if (name) {
    const item = await getRegistryItem(name);
    sourceCode = item?.files?.[0]?.content;
  }

  if (src) {
    sourceCode = await fs.readFile(
      path.join(
        /* turbopackIgnore: true */ process.cwd(),
        "src",
        src.replace(/^src[\\/]/, ""),
      ),
      "utf-8",
    );
  }

  if (!sourceCode) return null;

  const resolvedLanguage = language ?? title?.split(".").pop() ?? "tsx";

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <CodeBlock
          code={sourceCode}
          language={resolvedLanguage}
          title={title}
        />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <CodeBlock code={sourceCode} language={resolvedLanguage} title={title} />
    </CodeCollapsibleWrapper>
  );
}
