"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

export interface ComponentPreviewTabsProps extends React.ComponentProps<"div"> {
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  component: React.ReactNode;
  source: React.ReactNode;
}

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: ComponentPreviewTabsProps): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState("preview");

  return (
    <div
      className={cn(
        "not-prose group relative mt-4 mb-12 flex flex-col gap-2",
        className,
      )}
      {...props}
    >
      {!hideCode ? (
        <Tabs onValueChange={setActiveTab} value={activeTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTab value="preview">Preview</TabsTab>
              <TabsTab value="code">Code</TabsTab>
            </TabsList>
          </div>
        </Tabs>
      ) : null}
      <div
        className="relative overflow-hidden rounded-3xl border not-dark:bg-card"
        data-tab={activeTab}
      >
        <div
          className="invisible data-[active=true]:visible"
          data-active={activeTab === "preview"}
        >
          <div
            className="flex h-[450px] w-full justify-center overflow-x-auto overflow-y-auto p-10 [scrollbar-color:transparent_transparent] [scrollbar-gutter:stable_both-edges] [scrollbar-width:thin] data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-6 focus-within:[scrollbar-color:var(--border)_transparent] hover:[scrollbar-color:var(--border)_transparent]"
            data-align={align}
          >
            <div data-slot="preview">{component}</div>
          </div>
        </div>
        <div
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:m-0! **:[figure]:rounded-none! **:[pre]:h-[450px]"
          data-active={activeTab === "code"}
          data-slot="code"
        >
          {source}
        </div>
      </div>
    </div>
  );
}
