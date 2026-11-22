import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Field invalid>
      <FieldLabel>Work email</FieldLabel>
      <Input defaultValue="lucas@invalid" type="email" />
      <FieldDescription>Use your company email address.</FieldDescription>
      <FieldError match>Please enter a valid email address.</FieldError>
    </Field>
  );
}
