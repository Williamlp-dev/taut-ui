import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

export default function Particle() {
  return (
    <RadioGroup defaultValue="email" disabled>
      <label className="flex cursor-not-allowed items-center gap-2.5 text-muted-foreground text-sm">
        <Radio value="email" />
        <span>Email notifications</span>
      </label>
      <label className="flex cursor-not-allowed items-center gap-2.5 text-muted-foreground text-sm">
        <Radio value="sms" />
        <span>SMS notifications</span>
      </label>
    </RadioGroup>
  );
}
