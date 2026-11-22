"use client";

import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

const MAX_LENGTH = 160;

export default function Particle() {
  const [bio, setBio] = useState(
    "Building expressive interfaces with Base UI.",
  );

  return (
    <Field>
      <FieldLabel>Public bio</FieldLabel>
      <Textarea
        maxLength={MAX_LENGTH}
        onChange={(event) => setBio(event.target.value)}
        placeholder="Tell people a bit about yourself..."
        value={bio}
      />
      <FieldDescription>
        {bio.length} / {MAX_LENGTH} characters
      </FieldDescription>
    </Field>
  );
}
