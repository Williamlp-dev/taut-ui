import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";
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

const activities = Array.from({ length: 20 }, (_, i) => ({
  detail: `Automated build #${1420 - i} completed in 38s`,
  id: `act-${i + 1}`,
  time: `${(i + 1) * 12}m ago`,
  title: `Production release v2.4.${20 - i}`,
}));

export default function Particle() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="outline">Open Scrollable</Button>}
      />
      <SheetPopup side="right">
        <SheetHeader>
          <SheetTitle>Activity stream</SheetTitle>
          <SheetDescription>
            Recent deployments and automated checks across your workspace.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="px-0" scrollFade>
          <div className="flex flex-col">
            {activities.map((item, index) => (
              <div key={item.id}>
                {index > 0 && <Separator />}
                <div className="flex items-baseline justify-between gap-4 px-6 py-3 text-sm">
                  <div className="grid gap-0.5">
                    <span className="font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {item.detail}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-muted-foreground text-xs">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
