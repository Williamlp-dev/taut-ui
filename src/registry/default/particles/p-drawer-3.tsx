import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

export default function Particle() {
  return (
    <Drawer position="right">
      <DrawerTrigger render={<Button variant="outline">Inset Drawer</Button>} />
      <DrawerPopup showCloseButton variant="inset">
        <DrawerHeader>
          <DrawerTitle>Quick Settings</DrawerTitle>
          <DrawerDescription>
            Floating surface with rounded corners on all sides.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <p className="text-muted-foreground text-sm">
            The inset variant adds outer breathing room on larger screens while
            remaining full-bleed on compact viewports.
          </p>
        </DrawerPanel>
        <DrawerFooter variant="bare">
          <DrawerClose render={<Button variant="ghost" />}>Dismiss</DrawerClose>
          <DrawerClose render={<Button />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
