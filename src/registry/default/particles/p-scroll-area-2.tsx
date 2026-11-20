import { Card } from "@/registry/default/ui/card";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

export default function Particle() {
  return (
    <Card className="h-56 w-80 overflow-hidden">
      <ScrollArea overscrollContain scrollFade>
        <div className="space-y-3 p-5 text-muted-foreground text-sm leading-6">
          <p>
            ScrollArea applies smooth edge fade masks automatically whenever
            content overflows along the vertical or horizontal axis.
          </p>
          <p>
            As you scroll down, the top mask fades in proportionally to the
            scroll offset, while the bottom mask fades out once you reach the
            end of the container.
          </p>
          <p>
            Combined with overscrollContain, wheel and touch gestures stay
            contained inside the panel without pulling the parent page along.
          </p>
          <p>
            Overlay scrollbars remain hidden at rest and appear cleanly on hover
            or active scrolling, keeping dense interfaces uncluttered.
          </p>
        </div>
      </ScrollArea>
    </Card>
  );
}
