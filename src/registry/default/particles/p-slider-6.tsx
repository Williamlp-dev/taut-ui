import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <div className="flex h-48 items-center justify-center">
      <Slider
        aria-label="Equalizer"
        defaultValue={60}
        orientation="vertical"
        showValueIndicator
      />
    </div>
  );
}
