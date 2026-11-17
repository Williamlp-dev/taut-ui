import type * as React from "react";
import {
  Card,
  CardFrame,
  CardFrameFooter,
  CardPanel,
} from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";

export function ParticleCardContainer({
  children,
  className,
  colSpan,
  footer,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  footer: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      className={cn(
        "relative flex min-w-0",
        colSpan === 2 && "lg:col-span-2",
        className,
      )}
    >
      <CardFrame className="w-full">
        <Card className="min-h-52 flex-1 flex-col flex-wrap overflow-x-auto bg-card">
          <CardPanel className="flex flex-1 items-center justify-center p-6 lg:px-8 lg:py-12">
            {children}
          </CardPanel>
        </Card>
        <CardFrameFooter className="flex items-center justify-between gap-3 px-3 py-2">
          {footer}
        </CardFrameFooter>
      </CardFrame>
    </div>
  );
}
