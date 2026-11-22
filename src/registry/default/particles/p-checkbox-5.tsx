import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldLabel } from "@/registry/default/ui/field";

export default function Particle() {
  return (
    <Field className="w-auto" disabled>
      <FieldLabel>
        <Checkbox defaultChecked disabled />
        Enforced by organization policy
      </FieldLabel>
    </Field>
  );
}
