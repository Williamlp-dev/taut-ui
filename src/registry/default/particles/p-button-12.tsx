"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button onClick={() => setCopied(true)} selected={copied} variant="tonal">
      {copied ? (
        <>
          <CheckIcon aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon aria-hidden="true" />
          Copy Token
        </>
      )}
    </Button>
  );
}
