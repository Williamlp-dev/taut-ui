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
        render={<Button variant="outline">Hover or focus</Button>}
      />
      <TooltipPopup>Add to library</TooltipPopup>
    </Tooltip>
  );
}
