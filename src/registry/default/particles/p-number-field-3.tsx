import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/default/ui/number-field";

export default function Particle() {
  return (
    <NumberField
      className="w-full max-w-52"
      defaultValue={24}
      shape="rounded"
      variant="outline"
    >
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput aria-label="Font size" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
