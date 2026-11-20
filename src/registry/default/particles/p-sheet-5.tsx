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
      <SheetTrigger
        render={<Button variant="outline">Open Bare Footer</Button>}
      />
      <SheetPopup side="right">
        <SheetHeader>
          <SheetTitle>Revoke API key</SheetTitle>
          <SheetDescription>
            Any services authenticating with this token will immediately lose
            access.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel>
          <p className="text-muted-foreground text-sm">
            Key fingerprint:{" "}
            <span className="font-mono text-foreground">
              taut_live_98f2...c41a
            </span>
          </p>
        </SheetPanel>
        <SheetFooter variant="bare">
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <SheetClose render={<Button variant="destructive" />}>
            Revoke key
          </SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
