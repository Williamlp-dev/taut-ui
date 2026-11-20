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
      <SheetTrigger render={<Button variant="outline">Open Bottom</Button>} />
      <SheetPopup className="mx-auto max-w-[1440px]" side="bottom">
        <SheetHeader>
          <SheetTitle>Export dataset</SheetTitle>
          <SheetDescription>
            Download a snapshot of your analytics events for offline analysis.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel>
          <p className="text-muted-foreground text-sm">
            Exports include all raw event payloads from the last 30 days in
            compressed NDJSON format.
          </p>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <SheetClose render={<Button />}>Start export</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
