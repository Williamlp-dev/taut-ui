import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

export default function Particle() {
  return (
    <RadioGroup defaultValue="comfortable">
      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <Radio value="compact" />
        <span>Compact</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <Radio value="comfortable" />
        <span>Comfortable</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm">
        <Radio value="spacious" />
        <span>Spacious</span>
      </label>
    </RadioGroup>
  );
}
