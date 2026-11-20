import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export default function Particle() {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Open Popover</Button>}
      />
      <PopoverPopup>
        <PopoverTitle>What&apos;s new</PopoverTitle>
        <PopoverDescription>
          We just shipped a major update with new components and improved
          performance across the board.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>
  );
}
