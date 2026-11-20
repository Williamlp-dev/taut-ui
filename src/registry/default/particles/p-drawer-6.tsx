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
import { Separator } from "@/registry/default/ui/separator";

const releases = [
  { notes: "Added Ctrl+Space trigger to Autocomplete.", version: "v1.24.0" },
  {
    notes: "Redesigned Accordion with M3 expressive segmented surfaces.",
    version: "v1.23.0",
  },
  { notes: "Introduced optional ripple prop on Card.", version: "v1.22.0" },
  {
    notes: "Removed color transitions for instant dark/light theme switching.",
    version: "v1.21.0",
  },
  {
    notes: "Added BadgeAnchor for dot and counter badges.",
    version: "v1.20.0",
  },
  {
    notes: "Improved Ripple diagonal fill across wide buttons.",
    version: "v1.19.0",
  },
  { notes: "Added nested stacking support to Drawer.", version: "v1.18.0" },
  {
    notes: "Introduced Command palette with grouped items.",
    version: "v1.17.0",
  },
  { notes: "Added ScrollArea edge fade masks.", version: "v1.16.0" },
  { notes: "Added spring corner morphing to Button.", version: "v1.15.0" },
  { notes: "Migrated primitives to Base UI v1.", version: "v1.14.0" },
  { notes: "Added dark, light, and taut theme presets.", version: "v1.13.0" },
  { notes: "Added DrawerMenu checkbox and radio items.", version: "v1.12.0" },
  {
    notes: "Added inset variant with floating rounded corners.",
    version: "v1.11.0",
  },
  {
    notes: "Added CardFrame layout for grouped settings panels.",
    version: "v1.10.0",
  },
  {
    notes: "Switched Badge semantic variants to solid color-mix surfaces.",
    version: "v1.9.0",
  },
  {
    notes: "Fixed Spinner alignment inside loading Button.",
    version: "v1.8.0",
  },
  {
    notes: "Removed contain: paint from Ripple to fix subpixel edge clipping.",
    version: "v1.7.0",
  },
  {
    notes: "Added instant exit option to Autocomplete popup.",
    version: "v1.6.0",
  },
  { notes: "Added keyboard shortcut hints to Command.", version: "v1.5.0" },
  { notes: "Added horizontal orientation to Card.", version: "v1.4.0" },
  {
    notes: "Added swipe-to-dismiss gestures on all four edges.",
    version: "v1.3.0",
  },
  {
    notes: "Added reduced-motion fallbacks across components.",
    version: "v1.2.0",
  },
  { notes: "Initial public release of taut-ui.", version: "v1.0.0" },
];

export default function Particle() {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button variant="outline">Scrollable Drawer</Button>}
      />
      <DrawerPopup className="max-h-[60dvh]" showBar>
        <DrawerHeader>
          <DrawerTitle>Changelog</DrawerTitle>
          <DrawerDescription>
            Recent updates and improvements across the library.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel className="px-0" scrollFade>
          <div className="flex flex-col">
            {releases.map((release, index) => (
              <div key={release.version}>
                <div className="flex flex-col gap-0.5 px-6 py-3">
                  <span className="font-medium font-mono text-foreground text-xs">
                    {release.version}
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {release.notes}
                  </p>
                </div>
                {index < releases.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Got it</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
