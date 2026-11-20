import {
  FileTextIcon,
  FolderIcon,
  MailIcon,
  MessageSquareIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">File</Button>} />
      <MenuPopup>
        <MenuItem>
          <FileTextIcon />
          New document
        </MenuItem>
        <MenuItem>
          <FolderIcon />
          New folder
        </MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>
            <Share2Icon />
            Share via
          </MenuSubTrigger>
          <MenuSubPopup>
            <MenuItem>
              <MailIcon />
              Email
            </MenuItem>
            <MenuItem>
              <MessageSquareIcon />
              Message
            </MenuItem>
          </MenuSubPopup>
        </MenuSub>
      </MenuPopup>
    </Menu>
  );
}
