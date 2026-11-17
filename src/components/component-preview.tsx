import * as React from "react";
import { Index } from "@/registry/__index__";
import { ComponentPreviewTabs } from "@/components/component-preview-tabs";
import { ComponentSource } from "@/components/component-source";
import { cn } from "@/lib/utils";

type PreviewEntry = {
  component?: React.ComponentType | null;
  meta?: { className?: string };
};

export interface ComponentPreviewProps
  extends Omit<React.ComponentProps<"div">, "ref"> {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps): React.ReactElement {
  const entry = (Index as Record<string, PreviewEntry | undefined>)[name];
  const PreviewComponent: React.ComponentType | undefined =
    entry?.component ??
    (name.startsWith("p-")
      ? React.lazy(async () => {
          const mod = await import(`@/registry/default/particles/${name}`);
          const exportKey = Object.keys(mod).find(
            (key) => typeof mod[key] === "function",
          );
          return {
            default: mod.default ?? (exportKey ? mod[exportKey] : undefined),
          };
        })
      : undefined);

  if (!PreviewComponent) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem]">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  return (
    <ComponentPreviewTabs
      align={align}
      className={cn(entry?.meta?.className, className)}
      component={<PreviewComponent />}
      hideCode={hideCode}
      source={<ComponentSource collapsible={false} name={name} />}
      {...props}
    />
  );
}
