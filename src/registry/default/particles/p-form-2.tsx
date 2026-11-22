"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  const [errors, setErrors] = useState<Record<string, string>>({
    domain: "This custom domain is already linked to another project.",
  });

  return (
    <Form
      errors={errors}
      onFormSubmit={(formValues) => {
        const domain = String(formValues.domain ?? "").trim();
        if (!domain.includes(".")) {
          setErrors({
            domain: "Enter a valid hostname (e.g. docs.taut.app).",
          });
          return;
        }
        setErrors({});
      }}
    >
      <Field name="domain">
        <FieldLabel>Custom domain</FieldLabel>
        <Input defaultValue="app.taut.dev" placeholder="docs.taut.app" />
        <FieldError />
      </Field>
      <Button className="w-full" type="submit">
        Verify domain
      </Button>
    </Form>
  );
}
