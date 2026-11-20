import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverActions,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function Particle() {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Invite member</Button>}
      />
      <PopoverPopup className="w-80">
        <PopoverTitle>Invite collaborator</PopoverTitle>
        <PopoverDescription>
          Send an invite link directly to their inbox.
        </PopoverDescription>
        <div className="mt-2">
          <Input placeholder="name@company.com" size="sm" type="email" />
        </div>
        <PopoverActions>
          <PopoverClose render={<Button size="xs" variant="ghost" />}>
            Cancel
          </PopoverClose>
          <PopoverClose render={<Button size="xs" />}>Send invite</PopoverClose>
        </PopoverActions>
      </PopoverPopup>
    </Popover>
  );
}
