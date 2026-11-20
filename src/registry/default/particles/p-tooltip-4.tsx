"use client";

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipCreateHandle,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const toolbarTooltip = TooltipCreateHandle<string>();

export default function Particle() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1.5">
        <TooltipTrigger
          handle={toolbarTooltip}
          payload="Bold (⌘B)"
          render={
            <Button aria-label="Bold" size="icon" variant="outline">
              <BoldIcon />
            </Button>
          }
        />
        <TooltipTrigger
          handle={toolbarTooltip}
          payload="Italic (⌘I)"
          render={
            <Button aria-label="Italic" size="icon" variant="outline">
              <ItalicIcon />
            </Button>
          }
        />
        <TooltipTrigger
          handle={toolbarTooltip}
          payload="Underline (⌘U)"
          render={
            <Button aria-label="Underline" size="icon" variant="outline">
              <UnderlineIcon />
            </Button>
          }
        />
      </div>
      <Tooltip handle={toolbarTooltip}>
        {({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}
      </Tooltip>
    </TooltipProvider>
  );
}
