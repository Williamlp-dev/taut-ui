import { Button } from "@/registry/default/ui/button";
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
      <PopoverTrigger render={<Button variant="outline">Updates</Button>} />
      <PopoverPopup>
        <PopoverTitle>Sync completed</PopoverTitle>
        <PopoverDescription>
          All workspace tokens and registry files are up to date with the latest
          release.
        </PopoverDescription>
        <PopoverActions>
          <PopoverClose render={<Button size="xs" variant="ghost" />}>
            Dismiss
          </PopoverClose>
          <PopoverClose render={<Button size="xs" />}>Got it</PopoverClose>
        </PopoverActions>
      </PopoverPopup>
    </Popover>
  );
}
