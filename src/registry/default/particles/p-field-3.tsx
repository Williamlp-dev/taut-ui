import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Field disabled>
      <FieldLabel>Organization ID</FieldLabel>
      <Input defaultValue="org_01J8K9M2N4P6" />
      <FieldDescription>
        Managed automatically by your workspace administrator.
      </FieldDescription>
    </Field>
  );
}
