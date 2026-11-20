"use client";

import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

export default function Particle() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open Menu</Button>} />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel>
          <DrawerMenu>
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>General</DrawerMenuGroupLabel>
              <DrawerMenuItem>
                <UserIcon />
                Profile
              </DrawerMenuItem>
              <DrawerMenuItem>
                <SettingsIcon />
                Preferences
              </DrawerMenuItem>
              <DrawerMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
                variant="switch"
              >
                <span className="inline-flex items-center gap-2.5">
                  <BellIcon className="size-4 shrink-0" />
                  Notifications
                </span>
              </DrawerMenuCheckboxItem>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuItem variant="destructive">
              <LogOutIcon />
              Sign out
            </DrawerMenuItem>
          </DrawerMenu>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}
