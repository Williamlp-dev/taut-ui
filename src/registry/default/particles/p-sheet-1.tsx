import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
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
      <SheetTrigger render={<Button variant="outline">Open Sheet</Button>} />
      <SheetPopup side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Update your personal details and public handle.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid gap-4">
          <div className="grid gap-1.5">
            <label className="font-medium text-sm" htmlFor="sheet-name">
              Display name
            </label>
            <Input
              defaultValue="Lucas Santos"
              id="sheet-name"
              variant="outline"
            />
          </div>
          <div className="grid gap-1.5">
            <label className="font-medium text-sm" htmlFor="sheet-handle">
              Username
            </label>
            <Input defaultValue="@lucas" id="sheet-handle" variant="outline" />
          </div>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <SheetClose render={<Button />}>Save changes</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
