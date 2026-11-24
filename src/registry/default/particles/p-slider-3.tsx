import { Slider, SliderValue } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <Slider
      className="w-full max-w-xs"
      defaultValue={40}
      max={100}
      min={0}
      showTicks
      showValueIndicator
      step={20}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="font-medium text-sm">Quality</span>
        <SliderValue className="text-muted-foreground tabular-nums" />
      </div>
    </Slider>
  );
}
