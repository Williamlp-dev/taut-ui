import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldLabel } from "@/registry/default/ui/field";

export default function Particle() {
  return (
    <Field className="w-auto" invalid>
      <FieldLabel>
        <Checkbox aria-invalid />
        Agree to privacy policy
      </FieldLabel>
    </Field>
  );
}
