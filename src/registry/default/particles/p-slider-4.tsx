import { Volume1Icon, Volume2Icon } from "lucide-react";
import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <Slider
      aria-label="Volume"
      className="w-full max-w-xs"
      defaultValue={60}
      endIcon={<Volume2Icon />}
      showValueIndicator
      startIcon={<Volume1Icon />}
    />
  );
}
