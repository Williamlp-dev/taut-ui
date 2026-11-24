import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const options = [
  {
    description: "Delivered in 3–5 business days",
    label: "Standard shipping",
    price: "Free",
    value: "standard",
  },
  {
    description: "Delivered in 1–2 business days",
    label: "Express shipping",
    price: "$12",
    value: "express",
  },
];

export default function Particle() {
  return (
    <RadioGroup className="w-full max-w-sm gap-2.5" defaultValue="standard">
      {options.map((option) => (
        <Card
          className="w-full cursor-pointer rounded-2xl has-data-checked:bg-[color-mix(in_oklab,var(--color-card),var(--color-primary)_14%)] has-data-checked:shadow-[inset_0_0_0_0.0625rem_var(--color-primary)]"
          key={option.value}
          orientation="horizontal"
          render={<label />}
          ripple
        >
          <Radio value={option.value} />
          <CardHeader className="gap-0.5">
            <CardTitle className="text-sm leading-5">{option.label}</CardTitle>
            <CardDescription className="text-xs leading-4">
              {option.description}
            </CardDescription>
            <CardAction className="font-medium text-foreground text-sm tabular-nums">
              {option.price}
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </RadioGroup>
  );
}
