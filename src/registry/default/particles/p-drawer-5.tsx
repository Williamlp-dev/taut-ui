import { KeyRoundIcon, ShieldIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

export default function Particle() {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button variant="outline">Nested Drawer</Button>}
      />
      <DrawerPopup className="mx-auto min-h-80 max-w-[1440px]" showBar>
        <DrawerHeader>
          <DrawerTitle>Workspace</DrawerTitle>
          <DrawerDescription>
            Stack up to three nested drawers to preview the depth and scale
            transitions.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <DrawerMenu>
            <Drawer>
              <DrawerMenuTrigger>
                <ShieldIcon />
                Security settings
              </DrawerMenuTrigger>
              <DrawerPopup className="mx-auto min-h-72 max-w-[1440px]" showBar>
                <DrawerHeader>
                  <DrawerTitle>Security</DrawerTitle>
                  <DrawerDescription>
                    Manage authentication methods and device sessions.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerPanel>
                  <DrawerMenu>
                    <Drawer>
                      <DrawerMenuTrigger>
                        <KeyRoundIcon />
                        Recovery keys
                      </DrawerMenuTrigger>
                      <DrawerPopup
                        className="mx-auto min-h-64 max-w-[1440px]"
                        showBar
                      >
                        <DrawerHeader>
                          <DrawerTitle>Recovery Keys</DrawerTitle>
                          <DrawerDescription>
                            Store these one-time codes in a safe place in case
                            you lose access to your authenticator.
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerPanel>
                          <p className="text-muted-foreground text-sm">
                            You have 6 unused recovery codes remaining.
                            Generating a new set will invalidate all previous
                            codes.
                          </p>
                        </DrawerPanel>
                        <DrawerFooter>
                          <DrawerClose render={<Button variant="ghost" />}>
                            Back
                          </DrawerClose>
                          <DrawerClose render={<Button />}>
                            Regenerate
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerPopup>
                    </Drawer>
                  </DrawerMenu>
                </DrawerPanel>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="ghost" />}>
                    Back
                  </DrawerClose>
                </DrawerFooter>
              </DrawerPopup>
            </Drawer>
          </DrawerMenu>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
