import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const plans = [
  {
    description: "Essential tools for personal projects.",
    label: "Starter",
    value: "starter",
  },
  {
    description: "Collaboration and analytics for growing teams.",
    label: "Pro",
    value: "pro",
  },
  {
    description: "Custom limits, SSO, and dedicated support.",
    label: "Enterprise",
    value: "enterprise",
  },
];

export default function Particle() {
  return (
    <RadioGroup className="w-full max-w-xs gap-3.5" defaultValue="pro">
      {plans.map((plan) => (
        <label
          className="flex cursor-pointer items-start gap-3"
          key={plan.value}
        >
          <Radio className="mt-0.5" value={plan.value} />
          <span className="flex flex-col gap-0.5">
            <span className="font-medium text-foreground text-sm leading-5">
              {plan.label}
            </span>
            <span className="text-muted-foreground text-xs leading-4">
              {plan.description}
            </span>
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
