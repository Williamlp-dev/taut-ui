import { RocketIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";

export default function Particle() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="tonal" />}>
        <RocketIcon className="size-4" />
        Upgrade to Pro
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm" showCloseButton>
        <DialogHeader>
          <DialogIcon>
            <RocketIcon />
          </DialogIcon>
          <DialogTitle>Unlock Taut Pro</DialogTitle>
          <DialogDescription>
            Take your interfaces to the next level with advanced fluid motions,
            custom sound design, and priority support.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between rounded-xl bg-[color-mix(in_oklab,var(--color-popover),var(--color-foreground)_5%)] px-4 py-3 text-xs first:rounded-t-2xl dark:bg-card">
              <span className="text-muted-foreground">Billing Cycle</span>
              <span className="font-medium text-foreground">
                Annual ($12/mo)
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[color-mix(in_oklab,var(--color-popover),var(--color-foreground)_5%)] px-4 py-3 text-xs last:rounded-b-2xl dark:bg-card">
              <span className="text-muted-foreground">Workspace Seats</span>
              <span className="font-medium text-foreground">Unlimited</span>
            </div>
          </div>
        </DialogPanel>
        <DialogFooter className="justify-center sm:justify-between">
          <DialogClose render={<Button variant="ghost" />}>
            Maybe later
          </DialogClose>
          <Button>Start 14-Day Free Trial</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
