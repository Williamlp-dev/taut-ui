import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <Slider
      aria-label="Brightness"
      className="w-full max-w-xs"
      defaultValue={65}
      showValueIndicator
      size="lg"
    />
  );
}
