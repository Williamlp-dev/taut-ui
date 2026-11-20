import {
  BookmarkIcon,
  DownloadIcon,
  FileTextIcon,
  Link2Icon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="secondary">Vibrant Menu</Button>} />
      <MenuPopup colorScheme="vibrant">
        <MenuItem>
          <FileTextIcon />
          Summarize
        </MenuItem>
        <MenuItem>
          <BookmarkIcon />
          Save to library
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <Link2Icon />
          Copy link
        </MenuItem>
        <MenuItem>
          <DownloadIcon />
          Export PDF
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}
