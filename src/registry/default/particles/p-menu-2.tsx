import { CopyIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Actions</Button>} />
      <MenuPopup gap>
        <MenuGroup>
          <MenuItem>
            <PencilIcon />
            Rename
          </MenuItem>
          <MenuItem>
            <CopyIcon />
            Duplicate
          </MenuItem>
          <MenuItem>
            <Share2Icon />
            Share
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuItem variant="destructive">
            <Trash2Icon />
            Delete
          </MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
