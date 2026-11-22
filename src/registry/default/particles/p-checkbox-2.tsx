import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";

export default function Particle() {
  return (
    <Field className="max-w-xs">
      <FieldLabel>
        <Checkbox defaultChecked />
        Enable desktop notifications
      </FieldLabel>
      <FieldDescription>
        Receive alerts when deployments complete or require approval.
      </FieldDescription>
    </Field>
  );
}
