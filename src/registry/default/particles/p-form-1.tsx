"use client";

import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "");
        toastManager.add({
          description: `Project "${name}" has been created.`,
          title: "Project created",
          type: "success",
        });
      }}
    >
      <Field name="name">
        <FieldLabel>Project name</FieldLabel>
        <Input placeholder="taut-ui" required />
        <FieldError match="valueMissing">Project name is required.</FieldError>
      </Field>
      <Field name="notes">
        <FieldLabel>Description</FieldLabel>
        <Textarea placeholder="Short summary of the project..." size="sm" />
        <FieldDescription>
          Optional internal notes for your team.
        </FieldDescription>
      </Field>
      <Button className="self-end" type="submit">
        Create project
      </Button>
    </Form>
  );
}
