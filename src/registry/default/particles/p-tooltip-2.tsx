import { ZapIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export default function Particle() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="secondary">
            <ZapIcon />
            Quick Action
          </Button>
        }
      />
      <TooltipPopup variant="vibrant">
        Run automated checks on current branch
      </TooltipPopup>
    </Tooltip>
  );
}
