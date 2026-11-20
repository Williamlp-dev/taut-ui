import { ZapIcon } from "lucide-react";
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
      <PopoverTrigger
        render={
          <Button variant="secondary">
            <ZapIcon />
            Quick tip
          </Button>
        }
      />
      <PopoverPopup colorScheme="vibrant">
        <PopoverTitle>Keyboard shortcuts</PopoverTitle>
        <PopoverDescription>
          Press Ctrl+Space inside Autocomplete inputs to open suggestions
          without a trigger button.
        </PopoverDescription>
        <PopoverActions>
          <PopoverClose render={<Button size="xs" />}>Nice</PopoverClose>
        </PopoverActions>
      </PopoverPopup>
    </Popover>
  );
}
