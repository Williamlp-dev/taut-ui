"use client";

import { CloudUploadIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle(): React.ReactElement {
  const [submitting, setSubmitting] = React.useState(false);

  function handleDeploy(): void {
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1800);
  }

  return (
    <Button loading={submitting} onClick={handleDeploy}>
      <CloudUploadIcon aria-hidden="true" />
      Deploy Release
    </Button>
  );
}
