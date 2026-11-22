import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>
        <Checkbox defaultChecked />
        Send release notes
      </FieldLabel>
      <FieldDescription>
        Receive a weekly summary when new components ship.
      </FieldDescription>
    </Field>
  );
}
