import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>Workspace URL</FieldLabel>
      <Input placeholder="taut-studio" />
      <FieldDescription>
        Your team will access projects at taut.app/taut-studio.
      </FieldDescription>
    </Field>
  );
}
