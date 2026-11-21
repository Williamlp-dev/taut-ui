import defaultMdxComponents from "fumadocs-ui/mdx";
import { InfoIcon } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
import { CodeBlockCommand } from "@/components/code-block-command";
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { CodeTabs } from "@/components/code-tabs";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { CopyButton } from "@/components/shared/copy-button";
import { getIconForLanguageExtension } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

function slugifyHeading(children: React.ReactNode): string | undefined {
  return children
    ?.toString()
    .replace(/ /g, "-")
    .replace(/'/g, "")
    .replace(/\?/g, "")
    .toLowerCase();
}

export const mdxComponents = {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "relative my-6 grid w-full items-start gap-x-2.5 gap-y-0.5 rounded-3xl border border-border/70 bg-secondary/40 px-5 py-4 text-foreground text-sm has-[>svg]:grid-cols-[1rem_1fr] [&>svg]:h-lh [&>svg]:w-4 [&>svg]:text-muted-foreground",
        className,
      )}
      role="alert"
      {...props}
    />
  ),
  AlertAction: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  ),
  AlertDescription: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "flex flex-col gap-2 text-muted-foreground [svg~&]:col-start-2",
        className,
      )}
      {...props}
    />
  ),
  AlertTitle: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn("font-medium [svg~&]:col-start-2", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
        className,
      )}
      {...props}
    />
  ),
  Button,
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "mt-6 rounded-2xl bg-secondary/40 px-5 py-3 italic",
        className,
      )}
      {...props}
    />
  ),
  CodeCollapsibleWrapper,
  CodeTabs,
  ComponentPreview,
  ComponentSource,
  code: ({
    className,
    __raw__,
    __src__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string;
    __src__?: string;
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
  }) => {
    if (typeof props.children === "string") {
      return (
        <code
          className={cn(
            "relative rounded-lg bg-secondary px-1.5 py-0.5 font-mono text-[.8125rem] text-secondary-foreground outline-none",
            className,
          )}
          {...props}
        />
      );
    }

    if (__npm__ && __yarn__ && __pnpm__ && __bun__) {
      return (
        <CodeBlockCommand
          __bun__={__bun__}
          __npm__={__npm__}
          __pnpm__={__pnpm__}
          __yarn__={__yarn__}
        />
      );
    }

    return (
      <>
        {__raw__ ? <CopyButton src={__src__} value={__raw__} /> : null}
        <code {...props} />
      </>
    );
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    const languageIcon =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null;

    return (
      <figcaption
        className={cn(
          "flex items-center gap-2 text-[.8125rem] text-code-foreground [&_svg]:size-4.5 [&_svg]:text-code-foreground [&_svg]:opacity-70 sm:[&_svg]:size-4",
          className,
        )}
        {...props}
      >
        {languageIcon}
        {children}
      </figcaption>
    );
  },
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => (
    <figure className={cn(className)} {...props} />
  ),
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 font-bold font-heading text-3xl tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => {
    const headingId = (props as { id?: string }).id || slugifyHeading(children);

    return (
      <h2
        {...props}
        className={cn(
          "mt-12 scroll-m-20 border-border/50 border-b pb-3 font-bold font-heading text-2xl tracking-tight first:mt-0 lg:mt-14 [&+p]:mt-4! *:[code]:text-2xl",
          className,
        )}
        id={headingId}
      >
        <a
          className="no-underline underline-offset-4 hover:underline"
          href={`#${headingId}`}
        >
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => {
    const headingId = (props as { id?: string }).id || slugifyHeading(children);

    return (
      <h3
        {...props}
        className={cn(
          "mt-9 scroll-m-20 font-semibold text-lg tracking-tight *:[code]:text-lg",
          className,
        )}
        id={headingId}
      >
        <a
          className="no-underline underline-offset-4 hover:underline"
          href={`#${headingId}`}
        >
          {children}
        </a>
      </h3>
    );
  },
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn("mt-8 scroll-m-20 font-medium tracking-tight", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 font-medium text-lg tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 font-medium text-base tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-6 border-border/60 md:my-8" {...props} />
  ),
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      alt={alt || ""}
      className={cn("mt-6 rounded-3xl border border-border/70", className)}
      height={Number(height)}
      src={typeof src === "string" ? src : ""}
      width={Number(width)}
      {...props}
    />
  ),
  InfoIcon,
  img: ({
    className,
    alt,
    src,
    width,
    height,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      alt={alt ?? ""}
      className={cn("rounded-2xl", className)}
      height={Number(height) || 450}
      src={typeof src === "string" ? src : ""}
      width={Number(width) || 800}
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol
      className={cn("my-6 ms-6 list-decimal text-muted-foreground", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn(
        "not-first:mt-4 text-muted-foreground leading-relaxed",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => (
    <ScrollArea className="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2">
      <pre
        className={cn(
          "w-max min-w-full px-4 py-4 text-[.8125rem] outline-none has-data-[slot=tabs]:p-0 has-data-highlighted-line:px-0 has-data-line-numbers:px-0",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </ScrollArea>
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-8 scroll-m-32 font-semibold text-foreground tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }: React.ComponentProps<"div">) => (
    <div
      className="steps [&>h3]:step relative ms-3 mb-12 border-border/70 border-s pl-6 [counter-reset:step] *:[h3]:first:mt-0!"
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  ),
  Tab: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn(className)} {...props} />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn(className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList className={cn(className)} {...props} />
  ),
  TabsPanel: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsPanel>) => (
    <TabsPanel
      className={cn(
        "relative [&>.steps]:mt-6 [&_h3]:font-medium [&_h3]:text-base *:[figure]:first:mt-2",
        className,
      )}
      {...props}
    />
  ),
  TabsTab: ({ className, ...props }: React.ComponentProps<typeof TabsTab>) => (
    <TabsTab className={cn(className)} {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="prose">
      <defaultMdxComponents.table {...props} />
    </div>
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
      className={cn("my-6 ms-6 list-disc text-muted-foreground", className)}
      {...props}
    />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
