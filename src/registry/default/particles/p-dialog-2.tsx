"use client";

import { MoreHorizontalIcon, Trash2Icon, UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/registry/default/ui/dialog";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/default/ui/menu";

export default function Particle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Menu>
        <MenuTrigger
          render={
            <Button size="icon-sm" variant="outline">
              <MoreHorizontalIcon />
            </Button>
          }
        />
        <MenuPopup align="center">
          <MenuItem>
            <UserPlusIcon className="size-4" />
            <span>Invite members</span>
          </MenuItem>
          <MenuSeparator />
          <MenuItem onClick={() => setOpen(true)} variant="destructive">
            <Trash2Icon className="size-4" />
            <span>Delete project</span>
          </MenuItem>
        </MenuPopup>
      </Menu>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogPopup className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? All associated data,
              repositories, and deployments will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button onClick={() => setOpen(false)} variant="destructive">
              Delete permanently
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </div>
  );
}
