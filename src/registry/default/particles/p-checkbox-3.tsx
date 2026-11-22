"use client";

import { useState } from "react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldLabel } from "@/registry/default/ui/field";

type SelectionState = "indeterminate" | "checked" | "unchecked";

export default function Particle() {
  const [state, setState] = useState<SelectionState>("indeterminate");

  function handleChange() {
    setState((prev) =>
      prev === "indeterminate"
        ? "checked"
        : prev === "checked"
          ? "unchecked"
          : "indeterminate",
    );
  }

  return (
    <Field className="w-auto">
      <FieldLabel>
        <Checkbox
          checked={state === "checked"}
          indeterminate={state === "indeterminate"}
          onCheckedChange={handleChange}
        />
        Select all items
      </FieldLabel>
    </Field>
  );
}
