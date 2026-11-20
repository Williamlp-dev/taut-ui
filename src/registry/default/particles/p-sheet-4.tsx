import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

export default function Particle() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open Inset</Button>} />
      <SheetPopup side="right" variant="inset">
        <SheetHeader>
          <SheetTitle>Inspector</SheetTitle>
          <SheetDescription>
            Floating surface detached from the viewport edges.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">Healthy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Region</span>
            <span className="font-medium">gru1 (São Paulo)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Latency</span>
            <span className="font-medium">14 ms</span>
          </div>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Dismiss</SheetClose>
          <SheetClose render={<Button />}>View logs</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
