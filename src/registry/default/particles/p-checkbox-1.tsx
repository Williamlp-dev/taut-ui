import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldLabel } from "@/registry/default/ui/field";

export default function Particle() {
  return (
    <Field className="w-auto">
      <FieldLabel>
        <Checkbox defaultChecked />
        Accept terms and conditions
      </FieldLabel>
    </Field>
  );
}
