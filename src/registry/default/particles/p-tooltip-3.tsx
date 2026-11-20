import { ShieldCheckIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipActions,
  TooltipDescription,
  TooltipPopup,
  TooltipTitle,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export default function Particle() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline">
            <ShieldCheckIcon />
            SSO Enforced
          </Button>
        }
      />
      <TooltipPopup side="bottom" variant="rich">
        <TooltipTitle>Single Sign-On is active</TooltipTitle>
        <TooltipDescription>
          All members must authenticate through your SAML 2.0 identity provider
          before accessing workspace resources.
        </TooltipDescription>
        <TooltipActions>
          <Button size="xs" variant="ghost">
            Security policy
          </Button>
        </TooltipActions>
      </TooltipPopup>
    </Tooltip>
  );
}
