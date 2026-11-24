import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

export default function Particle() {
  return (
    <NumberField
      className="w-full max-w-52"
      defaultValue={120}
      format={{ currency: "USD", style: "currency" }}
      min={0}
      step={5}
    >
      <NumberFieldScrubArea label="Budget" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
