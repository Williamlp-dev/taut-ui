import type * as React from "react";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { CopyButton } from "@/components/shared/copy-button";
import { getIconForLanguageExtension } from "@/components/shared/icons";
import { highlightCode } from "@/lib/highlight-code";

export interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  copyButton?: boolean;
  showLineNumbers?: boolean;
}

export async function CodeBlock({
  code,
  language,
  title,
  copyButton = true,
  showLineNumbers = true,
}: CodeBlockProps): Promise<React.ReactElement> {
  const highlightedHtml = await highlightCode(code, language, {
    showLineNumbers,
  });

  return (
    <figure data-rehype-pretty-code-figure="">
      {title ? (
        <figcaption
          className="flex items-center gap-2 text-[.8125rem] text-code-foreground [&_svg]:size-4.5 [&_svg]:text-code-foreground sm:[&_svg]:size-4"
          data-language={language}
          data-rehype-pretty-code-title=""
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      ) : null}
      {copyButton ? <CopyButton value={code} /> : null}
      <ScrollArea className="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2">
        <div
          className="contents"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </ScrollArea>
    </figure>
  );
}
