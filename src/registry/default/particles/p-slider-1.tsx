import { Slider, SliderValue } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={50}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="font-medium text-sm">Volume</span>
        <SliderValue className="text-muted-foreground tabular-nums" />
      </div>
    </Slider>
  );
}
